import React, { useContext } from 'react'
import { AiFillLike, AiOutlineLike, AiOutlineComment } from 'react-icons/ai'
import { FaUserLock, FaUsers } from 'react-icons/fa'
import { GiEarthAmerica } from 'react-icons/gi'
import { PostModal, Slider } from '@/components'
import parse from 'html-react-parser'
import { SocialContext } from '@/context'

function Post({ post, user }) {
    const { id, content, media, totalLike, vision, totalComment, createdAt } = post
    const creator = user ? user : post.creator
    const { modal, setModal } = useContext(SocialContext)
    return (
        <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg my-shadow dark:bg-zinc-800 dark:text-gray-100">
            <div className="flex space-x-4">
                <img alt="" src={creator?.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold capitalize">{creator?.name}</span>
                    <span className="text-xs dark:text-gray-400">{createdAt}</span>
                </div>
            </div>
            <div>
                {parse(content)}
                {media.length ? <div className='h-[30rem] mt-5'>
                    <Slider images={media} />
                </div> : ""}
            </div>
            <hr className='border-gray-300 dark:border-gray-500' />
            <div className="flex flex-wrap justify-between text-lg px-2">
                <div className="flex space-x-10 dark:text-gray-400">
                    <button className="flex items-center space-x-2 cursor-pointer">
                        <AiFillLike />
                        <span>{totalLike}</span>
                    </button>
                    <button className="flex items-center space-x-2 cursor-pointer" onClick={() => setModal({ ...modal, open: true, component: <PostModal modal={modal} setModal={setModal} post={post} creator={creator} /> })}>
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