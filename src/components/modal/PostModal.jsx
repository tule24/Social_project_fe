import React, { useEffect, useRef, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { AiFillLike, AiOutlineComment, AiOutlineCloseCircle, AiOutlineLike } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import parse from 'html-react-parser'
import { QueryResult, Slider, CommentSkeleton, CmtRep } from '@/components'
import { useQuery, useMutation } from '@apollo/client'
import { COMMENT_OF_POST, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from '@/graphql'
import { FiLoader } from 'react-icons/fi'
import { createCommentService, deleteCommentService, updateCommentService, likeCommentService, unlikeCommentService, likePostService, unlikePostService } from '@/services'
import { formatTime } from '@/helper'
import { FaUserLock, FaUsers } from 'react-icons/fa'

function PostModal({ modal, setModal, post, creator, liked, totalLike, likePost, unlikePost, setLiked, setTotalLike }) {
    const { id, content, media, vision, updatedAt } = post
    const { loading, error, data, fetchMore } = useQuery(COMMENT_OF_POST, { variables: { postId: id, page: 1 } })
    const [createComment] = useMutation(CREATE_COMMENT)
    const [updateComment] = useMutation(UPDATE_COMMENT)
    const [deleteComment] = useMutation(DELETE_COMMENT)
    const [likeComment] = useMutation(LIKE_COMMENT)
    const [unlikeComment] = useMutation(UNLIKE_COMMENT)
    const [loadingComment, setLoadingComment] = useState(false)

    const commentRef = useRef(null)
    const handleKeydown = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            handleSubmit()
        }
    }
    const handleSubmit = async () => {
        const content = commentRef.current.value
        if (content.trim() !== '') {
            setLoadingComment(true)
            createComment(createCommentService(id, content, setLoadingComment, setTotalComment))
            commentRef.current.value = ''
        }
    }

    const [likedChild, setLikedChild] = useState(liked)
    const [totalLikeChild, setTotalLikeChild] = useState(totalLike)
    const handleLikePost = () => {
        setLikedChild(!likedChild)
        if (likedChild) {
            setTotalLikeChild(totalLikeChild - 1)
            unlikePost(unlikePostService(id, setLikedChild, totalLikeChild, setTotalLikeChild))
        } else {
            setTotalLikeChild(totalLikeChild + 1)
            likePost(likePostService(id, setLikedChild, totalLikeChild, setTotalLikeChild))
        }
    }

    useEffect(() => {
        return () => {
            setLiked(likedChild)
            setTotalLike(totalLikeChild)
        }
    }, [likedChild])

    const [totalComment, setTotalComment] = useState(post.totalComment)
    const [isMore, setIsMore] = useState(true)
    const handleFetch = () => {
        if (data && data.commentOfPost) {
            const page = Math.floor((data.commentOfPost.length / 10) + 1)
            fetchMore({
                variables: { postId: id, page },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    if (fetchMoreResult.commentOfPost.length < 10) {
                        setIsMore(false)
                    }
                    const newCmt = fetchMoreResult.commentOfPost.filter(el => !prev.commentOfPost.find(cmt => cmt.id === el.id))
                    return Object.assign({}, prev, {
                        commentOfPost: [...prev.commentOfPost, ...newCmt]
                    })
                }
            })
        }
    }
    useEffect(() => {
        if (data && data.commentOfPost) {
            isMore && data.commentOfPost.length >= totalComment && setIsMore(false)
        }
    }, [data])

    return (
        <div className='w-full h-full bg-gray-200 grid lg:grid-cols-[1.5fr_1fr] sm:grid-cols-2 grid-cols-1 rounded-lg overflow-hidden'>
            <div className='bg-gray-200 dark:bg-zinc-800 overflow-auto custom-bar border-r-2 border-gray-300 dark:border-gray-500'>
                <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg dark:bg-zinc-800 dark:text-gray-100">
                    <div className='flex justify-between items-start'>
                        <div className="flex space-x-4">
                            <img alt="" src={creator.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-semibold capitalize">{creator.name}</span>
                                <span className="text-xs dark:text-gray-400">{formatTime(updatedAt)}</span>
                            </div>
                        </div>
                        <button onClick={() => setModal({ ...modal, open: false })}><AiOutlineCloseCircle size={30} /></button>
                    </div>
                    <div>
                        {parse(content)}
                        {media.length ? <Slider images={media} /> : ""}
                    </div>
                    <hr className='border-gray-300 dark:border-gray-500' />
                    <div className="flex flex-wrap justify-between text-lg px-2">
                        <div className="flex space-x-10 dark:text-gray-400">
                            <button className="flex items-center space-x-1" onClick={() => handleLikePost()}>
                                {likedChild ? <AiFillLike /> : <AiOutlineLike />}
                                <span>{totalLikeChild}</span>
                            </button>
                            <button className="flex items-center space-x-1">
                                <AiOutlineComment />
                                <span>{totalComment}</span>
                            </button>
                        </div>
                        <div className="flex space-x-2 dark:text-gray-400">
                            <button type="button" className="flex items-center space-x-1.5">
                                {vision === 'public' ? <GiEarthAmerica /> : (vision === 'friend' ? <FaUsers /> : <FaUserLock />)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-300 dark:bg-zinc-700 flex flex-col justify-between overflow-auto dark:text-white'>
                <div className='flex flex-col space-y-2 w-full p-5 overflow-auto custom-bar'>
                    <QueryResult loading={loading} error={error} data={data} skeleton={<CommentSkeleton />}>
                        {data?.commentOfPost?.map(el => <CmtRep
                            key={el.id}
                            parentId={post.id}
                            obj={el}
                            opt='comment'
                            updateFunc={updateComment}
                            updateSer={updateCommentService}
                            deleteFunc={deleteComment}
                            deleteSer={deleteCommentService}
                            likeFunc={likeComment}
                            likeSer={likeCommentService}
                            unlikeFunc={unlikeComment}
                            unlikeSer={unlikeCommentService}
                        />)}
                    </QueryResult>
                    {isMore && <p className='font-semibold text-sm cursor-pointer hover:underline' onClick={handleFetch}>View more comment</p>}
                </div>
                <div className='flex border-t border-gray-400 p-3 justify-center h-[4rem]'>
                    <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500'>
                        <textarea
                            type='text'
                            name='comment'
                            placeholder='Type your comment'
                            className='chat-area scrollbar-hide'
                            onKeyDown={handleKeydown}
                            required
                            ref={commentRef}
                        />
                        <button className='icon flex items-center px-4 cursor-pointer' disabled={loadingComment} onClick={handleSubmit}>
                            {loadingComment ? <FiLoader className='animate-spin' size={20} /> : <BsSendFill size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal