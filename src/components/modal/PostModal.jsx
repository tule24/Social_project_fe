import React, { useRef, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { AiFillLike, AiOutlineComment, AiOutlineCloseCircle, AiOutlineLike, AiOutlineEdit } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import parse from 'html-react-parser'
import { QueryResult, Slider, CommentSkeleton } from '@/components'
import { Comment } from './components'
import { useQuery, useMutation } from '@apollo/client'
import { COMMENT_OF_POST, CREATE_COMMENT } from '@/graphql'
import { FiLoader } from 'react-icons/fi'
import { createCommentService } from '@/services'

function PostModal({ modal, setModal, post, creator }) {
    const { id, content, media, totalLike, liked, vision, totalComment, createdAt } = post
    const { loading, error, data } = useQuery(COMMENT_OF_POST, { variables: { postId: id, page: 1 } })
    const [createComment] = useMutation(CREATE_COMMENT)
    const [loadingComment, setLoadingComment] = useState(false)
    const textComment = useRef(null)
    const handleComment = async () => {
        setLoadingComment(true)
        createComment(createCommentService(id, textComment.current.value, setLoadingComment))
    }

    return (
        <div className='w-full h-full bg-gray-200 grid grid-cols-[1.5fr_1fr] rounded-lg overflow-hidden'>
            <div className='bg-gray-200 dark:bg-zinc-800 overflow-auto border-r-2 border-gray-300 dark:border-gray-500'>
                <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg dark:bg-zinc-800 dark:text-gray-100">
                    <div className='flex justify-between items-start'>
                        <div className="flex space-x-4">
                            <img alt="" src={creator.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-semibold capitalize">{creator.name}</span>
                                <span className="text-xs dark:text-gray-400">{createdAt}</span>
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
                            <button className="flex items-center space-x-2">
                                {liked ? <AiFillLike /> : <AiOutlineLike />}
                                <span>{totalLike}</span>
                            </button>
                            <button className="flex items-center space-x-2">
                                <AiOutlineComment />
                                <span>{data?.commentOfPost?.length || totalComment}</span>
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
                <div className='flex flex-col space-y-2 w-full p-5 overflow-auto'>
                    <QueryResult loading={loading} error={error} data={data} skeleton={<CommentSkeleton />}>
                        {data?.commentOfPost?.map(el => <Comment postId={id} comment={el} key={el.id} />)}
                    </QueryResult>
                </div>
                <div className='flex border-t border-gray-400 p-3 justify-center h-[10%]'>
                    <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500 py-2'>
                        <input
                            type='text'
                            name='comment'
                            placeholder='Input your comment'
                            className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black dark:text-gray-200 focus:outline-none focus:border-none'
                            ref={textComment}
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

export default PostModal