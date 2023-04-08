import React, { useEffect, useRef, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { AiFillLike, AiOutlineComment, AiOutlineCloseCircle, AiOutlineLike } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import parse from 'html-react-parser'
import { QueryResult, Slider, CommentSkeleton, CmtRep, LoadingSpiner } from '@/components'
import { useQuery, useMutation } from '@apollo/client'
import { COMMENT_OF_POST, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT, POST_BY_ID } from '@/graphql'
import { FiLoader } from 'react-icons/fi'
import { createCommentService, deleteCommentService, updateCommentService, likeCommentService, unlikeCommentService, likePostService, unlikePostService } from '@/services'
import { formatTime } from '@/helper'
import { FaUserLock, FaUsers } from 'react-icons/fa'
import { TbRefresh } from 'react-icons/tb'

function PostNoti({ modal, setModal, postId, user }) {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState(null)
    const queryPost = useQuery(POST_BY_ID, { variables: { postId } })
    const queryComment = useQuery(COMMENT_OF_POST, { variables: { postId, page: 1 }, notifyOnNetworkStatusChange: true })

    useEffect(() => {
        if (queryPost.data) {
            setPost(queryPost.data.post)
            setLiked(queryPost.data.post.liked)
            setTotalLike(queryPost.data.post.totalLike)
        }
    }, [queryPost.data])
    useEffect(() => {
        queryComment.data && setComment(queryComment.data.commentOfPost)
    }, [queryComment.data])

    const [createComment] = useMutation(CREATE_COMMENT)
    const [updateComment] = useMutation(UPDATE_COMMENT)
    const [deleteComment] = useMutation(DELETE_COMMENT)
    const [likeComment] = useMutation(LIKE_COMMENT)
    const [unlikeComment] = useMutation(UNLIKE_COMMENT)
    const [loadingComment, setLoadingComment] = useState(false)

    const commentRef = useRef(null)
    const handleComment = async () => {
        setLoadingComment(true)
        const content = commentRef.current.value
        createComment(createCommentService(postId, content, setLoadingComment))
        commentRef.current.value = ''
    }

    const [liked, setLiked] = useState(false)
    const [totalLike, setTotalLike] = useState(0)
    const handleLikePost = () => {
        setLiked(!liked)
        if (liked) {
            setTotalLike(totalLike - 1)
            unlikePost(unlikePostService(postId, setLiked, totalLike, setTotalLike, user))
        } else {
            setTotalLike(totalLike + 1)
            likePost(likePostService(postId, setLiked, totalLike, setTotalLike, user))
        }
    }

    return (
        <div className='w-full h-full bg-gray-200 grid grid-cols-[1.5fr_1fr] rounded-lg overflow-hidden'>
            <div className='bg-gray-200 dark:bg-zinc-800 overflow-auto border-r-2 border-gray-300 dark:border-gray-500 custom-bar'>
                <QueryResult loading={queryPost.loading} error={queryPost.error} data={queryPost.data} skeleton={<LoadingSpiner />}>
                    <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg dark:bg-zinc-800 dark:text-gray-100">
                        <div className='flex justify-between items-start'>
                            <div className="flex space-x-4">
                                <img alt="" src={user.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                <div className="flex flex-col space-y-1">
                                    <span className="text-sm font-semibold capitalize">{user.name}</span>
                                    <span className="text-xs dark:text-gray-400">{post?.updatedAt ? formatTime(post.updatedAt) : '0'}</span>
                                </div>
                            </div>
                            <button onClick={() => setModal({ ...modal, open: false })}><AiOutlineCloseCircle size={30} /></button>
                        </div>
                        <div>
                            {post?.content ? parse(post.content) : ''}
                            {post?.media?.length ? <Slider images={post.media} /> : ""}
                        </div>
                        <hr className='border-gray-300 dark:border-gray-500' />
                        <div className="flex flex-wrap justify-between text-lg px-2">
                            <div className="flex space-x-10 dark:text-gray-400">
                                <button className="flex items-center space-x-1" onClick={() => handleLikePost()}>
                                    {post?.liked ? <AiFillLike /> : <AiOutlineLike />}
                                    <span>{post?.totalLike || 0}</span>
                                </button>
                                <button className="flex items-center space-x-1">
                                    <AiOutlineComment />
                                    <span>{comment?.length}</span>
                                </button>
                            </div>
                            <div className="flex space-x-2 dark:text-gray-400">
                                <button type="button" className="flex items-center space-x-1.5">
                                    {post?.vision === 'public' ? <GiEarthAmerica /> : (post?.vision === 'friend' ? <FaUsers /> : <FaUserLock />)}
                                </button>
                            </div>
                        </div>
                    </div>
                </QueryResult>
            </div>
            <div className='bg-gray-300 dark:bg-zinc-700 flex flex-col justify-between overflow-auto dark:text-white relative'>
                <button className='absolute right-1 top-1 text-gray-500 dark:text-gray-400 hover:text-black' title='refresh' onClick={() => queryComment.refetch()}><TbRefresh size={15} /></button>
                <div className='flex flex-col space-y-2 w-full p-5 overflow-auto custom-bar'>
                    <QueryResult loading={queryComment.loading} error={queryComment.error} data={queryComment.data} skeleton={<CommentSkeleton />} networkStatus={queryComment.networkStatus}>
                        {comment?.map(el => <CmtRep
                            key={el.id}
                            parentId={postId}
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
                </div>
                <div className='flex border-t border-gray-400 p-3 justify-center h-[10%]'>
                    <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500 py-2'>
                        <input
                            type='text'
                            placeholder='Input your comment'
                            className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black dark:text-gray-200 focus:outline-none focus:border-none'
                            ref={commentRef}
                        />
                        <button className='icon flex items-center px-4 cursor-pointer' disabled={loadingComment} onClick={() => handleComment()}>
                            {loadingComment ? <FiLoader className='animate-spin' size={20} /> : <BsSendFill size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostNoti