import React from 'react'
import { BsSendFill, BsClockHistory } from 'react-icons/bs'
import { AiFillLike, AiOutlineComment, AiOutlineCloseCircle } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import parse from 'html-react-parser'
import { QueryResult, Slider } from '@/components'
import { useQuery } from '@apollo/client'
import { COMMENT_OF_POST } from '@/graphql'
function PostModal({ modal, setModal, post }) {
    const { id, creator, content, media, totalLike, vision, totalComment, createdAt } = post
    const { loading, error, data } = useQuery(COMMENT_OF_POST, { variables: { postId: id, page: 1 } })
    
    return (
        <div className='w-full h-full bg-gray-200 grid grid-cols-[1.5fr_1fr] rounded-lg overflow-hidden'>
            <div className='bg-gray-200 dark:bg-zinc-800 overflow-auto border-r-2 border-gray-300 dark:border-gray-500'>
                <div className="flex flex-col w-full p-6 space-y-5 overflow-hidden rounded-lg dark:bg-zinc-800 dark:text-gray-100">
                    <div className='flex justify-between items-start'>
                        <div className="flex space-x-4">
                            <img alt="" src={creator.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{creator.name}</a>
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
                                <AiFillLike />
                                <span>{totalLike}</span>
                            </button>
                            <button className="flex items-center space-x-2">
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
                <div className='flex flex-col space-y-2 w-full p-5 overflow-auto'>
                    <QueryResult loading={loading} error={error} data={data}>
                        {data.postForUser.map(el => {
                            <div className='flex space-x-3' key={el.id}>
                                <img src={el.creator.ava} alt="ava" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500 items-start" />
                                <div>
                                    <div className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md w-max'>
                                        <p className='font-semibold'>{el.creator.name}</p>
                                        <p>{el.content}</p>
                                    </div>
                                    <div className='flex text-[12px] space-x-3 p-1 font-semibold dark:text-gray-200'>
                                        <button className="flex items-center space-x-2">
                                            <AiFillLike />
                                            <span>{el.totalLike}</span>
                                        </button>
                                        <button className="flex items-center space-x-2">
                                            <AiOutlineComment />
                                            <span>{el.totalReplies}</span>
                                        </button>
                                        <p className='flex items-center'><BsClockHistory /><span className='ml-1'>{el.createdAt}</span></p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </QueryResult>
                </div>
                <div className='flex border-t border-gray-400 p-3 justify-center h-[10%]'>
                    <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500 py-2'>
                        <input
                            type='text'
                            name='comment'
                            placeholder='Input your comment'
                            className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black dark:text-gray-200 focus:outline-none focus:border-none'
                        />
                        <span className='icon flex items-center px-4 cursor-pointer'>
                            <BsSendFill size={20} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal