import { GET_MESSAGE_ROOM, CREATE_MESSAGE } from '@/graphql'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { LoadingSpiner, QueryResult } from '@/components'
import { createMessageService, messageSubService } from '@/services'
import { FiLoader } from 'react-icons/fi'

function MiniChat({ room, closeChat, userId }) {
  const { subscribeToMore, loading, error, data } = useQuery(GET_MESSAGE_ROOM, { variables: { roomId: room.id } })
  const [createMessage] = useMutation(CREATE_MESSAGE)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [msgData, setMsgData] = useState([])
  const msgRef = useRef(null)
  const bottomRef = useRef(null)
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
  useEffect(() => {
    if (data) {
      let newMsgData = [...data.getMessageRoom.messages]
      newMsgData = newMsgData.reverse()
      setMsgData(newMsgData)
    }
  }, [data])
  useEffect(() => messageSubService(subscribeToMore), [])
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [msgData])
  return (
    <div className='h-[50vh] w-[20rem] bg-white dark:bg-zinc-700 dark:text-white rounded-lg my-shadow flex flex-col overflow-hidden'>
      <div className='w-full bg-blue-500 dark:bg-zinc-900 flex justify-between items-center px-2 py-1 h-[3rem]'>
        <div className="flex space-x-1 items-center">
          <img alt="ava" src={room.user.ava} className="object-cover w-9 h-9 rounded-full shadow dark:bg-gray-500" />
          <p className="font-semibold capitalize">{room.user.name}</p>
        </div>
        <GrClose size={20} className='cursor-pointer' onClick={() => closeChat(room.id)} />
      </div>
      <div className='flex-grow overflow-auto p-2 space-y-5 scrol relative' >
        <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
          {msgData?.map(el => {
            return el.creator.id !== userId ? (
              <div className='flex items-end text-sm' key={el.id}>
                <img src={el.creator.ava} alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 mr-1" />
                <div className='max-w-[50%] space-y-1 flex flex-col items-start'>
                  {el.content.map(msg => {
                    return (
                      <p title={msg.createdAt} className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words' key={msg.createdAt}>
                        {msg.message}
                      </p>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className='flex items-end text-sm justify-end' key={el.id}>
                <div className='max-w-[50%] space-y-1 flex flex-col items-end'>
                  {el.content.map(msg => {
                    return (
                      <p title={msg.createdAt} className='bg-blue-500 dark:bg-slate-900 py-1 px-2 rounded-md break-words' key={msg.createdAt}>
                        {msg.message}
                      </p>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {msgData.length === 0 && <div className='flex justify-center items-center h-full'>
            <p className='text-sm text-gray-300 text-center'>You are now connected! <br /> Send your first message!</p>
          </div>}
        </QueryResult>
        <span ref={bottomRef} />
      </div>
      <div className='max-h-[2.8rem] border-t flex'>
        <textarea
          ref={msgRef}
          type='text'
          name='message'
          placeholder='Type your message'
          className='chat-area'
          onKeyDown={handleKeydown}
          required
        />
        <button className='icon cursor-pointer flex items-center px-3 text-gray-500' onClick={handleSubmit}>
          {loadingMessage ? <FiLoader className='animate-spin' size={20} /> : <BsSendFill size={20} />}
        </button>
      </div>
    </div>
  )
}

export default MiniChat