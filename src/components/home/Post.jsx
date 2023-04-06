import React, { useContext, useState } from 'react'
import { AiFillLike, AiOutlineLike, AiOutlineComment } from 'react-icons/ai'
import { FaUserLock, FaUsers } from 'react-icons/fa'
import { GiEarthAmerica } from 'react-icons/gi'
import { BiEdit } from 'react-icons/bi'
import { PostModal, Slider, PostEdit, UserLike } from '@/components'
import parse from 'html-react-parser'
import { SocialContext } from '@/context'
import { useMutation } from '@apollo/client'
import { UPDATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, USER_LIKE_POST } from '@/graphql'
import { likePostService, unlikePostService } from '@/services'
import { formatTime, minifyText } from '@/helper'
import { Link } from 'react-router-dom'

function Post({ post, user, isProfile }) {
    const { id, content, media, vision, totalComment, updatedAt } = post
    const creator = post.creator ? post.creator : user
    const [showLike, setShowLike] = useState(false)
    const [liked, setLiked] = useState(post.liked)
    const [totalLike, setTotalLike] = useState(post.totalLike)
    const { modal, setModal, userInfo } = useContext(SocialContext)
    const [updatePost] = useMutation(UPDATE_POST)
    const [deletePost] = useMutation(DELETE_POST)
    const [likePost] = useMutation(LIKE_POST)
    const [unlikePost] = useMutation(UNLIKE_POST)
    const [full, setFull] = useState(content.length < 480)

    const handleLikePost = () => {
        setLiked(!liked)
        if (liked) {
            setTotalLike(totalLike - 1)
            unlikePost(unlikePostService(id, setLiked, totalLike, setTotalLike, user))
        } else {
            setTotalLike(totalLike + 1)
            likePost(likePostService(id, setLiked, totalLike, setTotalLike, user))
        }
    }
    return (
        <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg my-shadow dark:bg-zinc-800 dark:text-gray-100">
            <div className='flex justify-between'>
                <div className="flex space-x-4 items-center">
                    <img alt="" src={creator?.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                    <div className="flex flex-col space-y-1">
                        <Link to={creator?.id !== user?.id ? `/user/${creator?.id}` : '/profile'} className="text-sm font-semibold capitalize">{creator?.name}</Link>
                        <span className="text-xs dark:text-gray-400">{formatTime(updatedAt)}</span>
                    </div>
                </div>
                {isProfile && <button
                    className='bg-black bg-opacity-10 rounded-full sm:w-12 sm:h-12 w-8 h-8 flex items-center justify-center'
                    onClick={() => setModal({
                        ...modal,
                        open: true,
                        component: <PostEdit
                            user={user}
                            modal={modal}
                            setModal={setModal}
                            post={post}
                            updatePost={updatePost}
                            deletePost={deletePost}
                        />
                    })}
                >
                    <BiEdit size={20} />
                </button>}
            </div>
            <div>
                {full ? parse(content) : parse(minifyText(content, 480))}
                {full ?
                    (content.length < 480 ? '' : <span className='font-semibold cursor-pointer hover:underline' onClick={() => setFull(false)}>See less</span>)
                    : <span className='font-semibold cursor-pointer hover:underline' onClick={() => setFull(true)}>See more</span>}
                {media.length ? <div className='h-[30rem] mt-5'>
                    <Slider images={media} />
                </div> : ""}
            </div>
            <hr className='border-gray-300 dark:border-gray-500' />
            <div className="flex flex-wrap justify-between text-lg px-2">
                <div className="flex space-x-10 dark:text-gray-400">
                    <div className="flex items-center space-x-1 relative">
                        <button onClick={() => handleLikePost()}>{liked ? <AiFillLike /> : <AiOutlineLike />}</button>
                        {totalLike > 0
                            ? <span className='hover:underline hover:text-blue-600 cursor-pointer' onClick={() => setShowLike(true)}>{totalLike}</span>
                            : <span>{totalLike}</span>
                        }
                        {showLike && <UserLike
                            query={USER_LIKE_POST}
                            args={{ postId: id }}
                            setShowLike={setShowLike}
                            opt='post'
                        />}
                    </div>
                    <button
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => setModal({
                            ...modal,
                            open: true,
                            component: <PostModal
                                creator={creator}
                                modal={modal}
                                setModal={setModal}
                                post={post}
                                unlikePost={unlikePost}
                                likePost={likePost}
                                setLiked={setLiked}
                                setTotalLike={setTotalLike}
                                liked={liked}
                                totalLike={totalLike}
                            />
                        })}>
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
    )
}

export default Post