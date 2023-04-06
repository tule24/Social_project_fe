import React, { useContext, useState } from 'react'
import { MdFiberNew } from 'react-icons/md'
import { SiMessenger } from 'react-icons/si'
import { SocialContext } from '@/context'
import { Link } from 'react-router-dom'
import { formatTime, minifyText } from '@/helper'

function Contact() {
    const { messageRoom, miniChat, setMiniChat, setMessageRoom } = useContext(SocialContext)
    const handleOpenChat = (el, i) => {
        const checkExist = miniChat.find(chat => chat.id === el.id)
        if (!checkExist) {
            if (miniChat.length > 3) {
                const newMiniChat = [...miniChat]
                newMiniChat[0] = el
                setMiniChat([...newMiniChat])
            } else {
                setMiniChat([el, ...miniChat])
            }
            messageRoom[i].newMessage = false
            setMessageRoom([...messageRoom])
        }
    }
    const [filter, setFilter] = useState('')
    return (
        <div className='layout-parent-right'>
            <div className='font-semibold tracking-widest flex items-center'>
                <h1 className='text-3xl lg:block hidden'>Contacts</h1>
                <Link to={"/chat"} className="ml-0 lg:ml-3 p-3 rounded-full bg-gray-300 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-gray-500"><SiMessenger /></Link>
            </div>
            <label htmlFor="Search" className="hidden">Search</label>
            <div className="relative w-full lg:block hidden">
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
                    className="w-full rounded-full my-input"
                    onChange={e => setFilter(e.target.value)}
                />
            </div>
            <div className='space-y-6 overflow-y-auto h-[75vh] scrollbar-hide'>
                {messageRoom?.filter(el => el.user.name.includes(filter)).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((el, i) => {
                    return <div className='flex items-center justify-between' key={el.id}>
                        <div className='flex items-center '>
                            <div className="relative flex-shrink-0">
                                <span className={`absolute bottom-0 right-0 w-3 h-3 border rounded-full text-gray-100 border-gray-900 bg-green-400`} />
                                <img src={el.user.ava} alt="ava" className="w-10 h-10 border rounded-full bg-gray-300 border-gray-400 cursor-pointer" onClick={() => handleOpenChat(el, i)} />
                            </div>
                            <div className='lg:flex flex-col hidden'>
                                <span className='font-semibold ml-2 capitalize cursor-pointer hover:underline flex' onClick={() => handleOpenChat(el, i)}>
                                    {el.user.name}
                                    {el.newMessage && <MdFiberNew className='text-red-500' />}
                                </span>
                                <span className={`ml-2 text-[12px] ${el.newMessage ? 'text-black dark:text-white font-semibold' : 'text-gray-500'}`}>{el?.lastMessage?.content ? minifyText(el.lastMessage.content, 12) : 'Send message!'}</span>
                            </div>
                        </div>
                        <div className='contact-format text-xl'>
                            <span className='text-[10px] dark:text-gray-500'>{formatTime(el.updatedAt)}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Contact