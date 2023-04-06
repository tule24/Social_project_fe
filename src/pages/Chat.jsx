import { BigChat, Header, HOCModal } from '@/components'
import React, { useContext, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BsClockHistory, BsSendFill } from 'react-icons/bs'
import { SocialContext } from '@/context'
import { FiLoader } from 'react-icons/fi'
import { createMessageService } from '@/services'
import { CREATE_MESSAGE } from '@/graphql'
import { useMutation } from '@apollo/client'
import { formatTime } from '@/helper'
import { MdFiberNew } from 'react-icons/md'

function Chat() {
    const { messageRoom, setMessageRoom, userInfo } = useContext(SocialContext)
    const [createMessage] = useMutation(CREATE_MESSAGE)
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [room, setRoom] = useState(null)
    const msgRef = useRef(null)
    const handleKeydown = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            handleSubmit()
        }
    }
    const handleSubmit = () => {
        const content = msgRef.current.value
        if (content.trim() !== '') {
            setLoadingMessage(true)
            createMessage(createMessageService(room.id, content, setLoadingMessage))
            msgRef.current.value = ''
        }
    }
    const handleRoom = (el, i) => {
        setRoom(el)
        messageRoom[i].newMessage = false
        setMessageRoom([...messageRoom])
    }
    return (
        <div className='dark:bg-zinc-900 bg-gray-100 h-screen w-screen pt-20 grid grid-cols-[25%_75%]'>
            <div className='border-r border-gray-300 pt-5 overflow-auto'>
                <div className="relative w-[95%] mx-auto">
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
                        className="w-full my-input rounded-lg" />
                </div>
                <h1 className='my-2 font-semibold text-lg text-center dark:text-white'>Chats</h1>
                {messageRoom?.map((el, i) => {
                    return <div className='flex justify-between items-start border-t border-gray-300 p-2 cursor-pointer' key={el.id} onClick={() => handleRoom(el, i)}>
                        <div className='flex items-center space-x-2'>
                            <img src={el.user.ava} alt="ava" className='rounded-full w-10 h-10' key={el.user.ava} />
                            <div className='flex flex-col'>
                                <p className='font-semibold capitalize text-white'>{el.user.name} {el.newMessage && <MdFiberNew className='text-red-500' />}</p>
                                <p className={`text-sm ${el.newMessage ? 'text-black dark:text-white font-semibold' : 'text-gray-400'}`}>{el?.lastMessage?.content || 'Send message!'}</p>
                            </div>
                        </div>
                        <p className='flex items-center text-[12px] text-gray-400'><BsClockHistory className='mr-1' /> {el?.updatedAt ? formatTime(el.updatedAt) : ''}</p>
                    </div>
                })}
            </div>
            <div className='bg-gray-200 dark:bg-zinc-500 flex flex-col overflow-auto'>
                <div className='flex justify-between h-[10%] px-5 shadow bg-gray-300 dark:bg-zinc-700'>
                    <div className='flex items-center space-x-1'>
                        <img src={room?.user?.ava || '/avatar.png'} alt="ava" className='rounded-full w-10 h-10' />
                        <p className='font-semibold capitalize dark:text-white'>{room?.user?.name || 'Select user'}</p>
                    </div>
                    <p className='flex items-center text-[12px] text-gray-400'><BsClockHistory className='mr-1' />{room?.updatedAt ? formatTime(room.updatedAt) : ''}</p>
                </div>
                {room
                    ? <BigChat roomId={room.id} userId={userInfo.id} />
                    : (
                        <div className='flex-grow shadow p-2 flex items-end'>
                            <div className='flex justify-center items-center h-full w-full'>
                                <p className='text-sm text-gray-400 text-center'>Select friend to start your conversation!</p>
                            </div>
                        </div>
                    )}
                <div className='h-[10%] py-3'>
                    <div className='w-[95%] max-h-[3rem] flex mx-auto my-auto rounded-full p-1 bg-gray-100'>
                        <textarea
                            ref={msgRef}
                            type='text'
                            name='message'
                            placeholder='Type your message'
                            className='chat-area dark:text-black'
                            onKeyDown={handleKeydown}
                            disabled={!room}
                            required
                        />
                        <button className='icon cursor-pointer flex items-center px-3 text-gray-500' onClick={handleSubmit}>
                            {loadingMessage ? <FiLoader className='animate-spin' size={20} /> : <BsSendFill size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat