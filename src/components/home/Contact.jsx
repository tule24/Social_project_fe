import React, { useContext, useEffect, useState } from 'react'
import { AiFillPhone, AiFillMessage } from 'react-icons/ai'
import { SiMessenger } from 'react-icons/si'
import { SocialContext } from '@/context'
import { QueryResult } from '@/components'
import { useQuery } from '@apollo/client'
import { MESSAGE_ROOM_OF_USER } from '@/graphql'

function Contact({ userId }) {
    const [messageRoom, setMessageRoom] = useState([])
    const { miniChat, setMiniChat } = useContext(SocialContext)
    const { loading, error, data } = useQuery(MESSAGE_ROOM_OF_USER)
    useEffect(() => {
        if (data && data.user && data.user.messageRoomOfUser) {
            const msgRooms = data.user.messageRoomOfUser.map(el => {
                const user = el.users.find(u => u.id !== userId)
                return {
                    id: el.id,
                    user
                }
            })
            setMessageRoom([...msgRooms])
        }
    }, [data])
    return (
        <div className='fixed space-y-4 h-screen right-0 top-[6rem] w-[20%] px-3 text-gray-800 dark:text-gray-100 shadow-xl'>
            <h1 className='text-3xl font-semibold tracking-widest flex items-center'>Contacts <SiMessenger className='ml-3' size={20} /></h1>
            <label htmlFor="Search" className="hidden">Search</label>
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                        <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-500 dark:text-gray-100">
                            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                        </svg>
                    </button>
                </span>
                <input
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    className="w-full py-2 pl-10 text-sm border border-gray-300 dark:border-zinc-700 rounded-full focus:outline-none bg-gray-200 dark:bg-zinc-700 text-gray-100 focus:text-black dark:focus:text-gray-300 focus:bg-gray-300 dark:focus:bg-gray-600 focus:border-violet-400" />
            </div>
            <div className='space-y-6'>
                <QueryResult loading={loading} error={error} data={data}>
                    {messageRoom?.map(el => {
                        return <div className='flex items-center justify-between' key={el.id}>
                            <div className='flex items-center '>
                                <div className="relative flex-shrink-0">
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 border rounded-full text-gray-100 border-gray-900 bg-green-400`} />
                                    <img src={el.user.ava} alt="ava" className="w-10 h-10 border rounded-full bg-gray-500 border-gray-700" />
                                </div>
                                <span className='font-semibold ml-2 capitalize cursor-pointer hover:underline' onClick={() => setMiniChat([...miniChat, el])}>{el.user.name}</span>
                            </div>
                            <div className='contact-format text-xl space-x-3 '>
                                <AiFillPhone className='contact-btn' />
                                <AiFillMessage className='contact-btn' onClick={() => setMiniChat([...miniChat, el])} />
                            </div>
                        </div>
                    })}
                </QueryResult>
            </div>
        </div>
    )
}

export default Contact