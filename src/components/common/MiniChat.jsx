import { GET_MESSAGE_ROOM } from '@/graphql'
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BsSendFill } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { LoadingSpiner, QueryResult } from '.'

function MiniChat({ room, closeChat, userId }) {
  const { loading, error, data } = useQuery(GET_MESSAGE_ROOM, { variables: { roomId: room.id } })
  const [dataMsg, setDataMsg] = useState([])
  useEffect(() => {
    if (data) {
      const { getMessageRoom: { messages } } = data
      const newDataMsg = []
      const pre = -1
      messages.forEach(el => {
        if (pre >= 0 && newDataMsg[pre].creator.id === el.creator.id) {
          newDataMsg[pre].msgChild.push({ content: el.content, createdAt: el.createdAt })
        } else {
          pre += 1
          newDataMsg[pre].push({ ...el, msgChild: [] })
        }
      })

      setDataMsg([...newDataMsg])
    }
  }, [data])
  return (
    <div className='fixed bottom-5 w-max right-[20%] flex justify-end space-x-2'>
      <div className='h-[50vh] w-[20rem] bg-white dark:bg-zinc-700 dark:text-white rounded-lg my-shadow flex flex-col overflow-hidden'>
        <div className='w-full bg-blue-500 dark:bg-zinc-900 flex justify-between items-center px-2 py-1 h-[15%]'>
          <div className="flex space-x-1 items-center">
            <img alt="ava" src={room.user.ava} className="object-cover w-9 h-9 rounded-full shadow dark:bg-gray-500" />
            <p className="font-semibold capitalize">{room.user.name}</p>
          </div>
          <GrClose size={20} className='cursor-pointer' onClick={() => closeChat(room.id)} />
        </div>
        <div className='flex-grow overflow-auto p-2 space-y-5'>
          <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
            {dataMsg?.map(el => {
              return el.creator.id !== userId ? (
                <div className='flex items-end text-sm' key={el.id}>
                  <img src={el.creator.ava} alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 mr-1" />
                  <div className='w-[max] space-y-1'>
                    <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      {el.content}
                    </p>
                    {el.msgChild?.map((child, i) => {
                      return (
                        <p className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md break-words' key={i}>
                          {child.content}
                        </p>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className='flex items-end text-sm justify-end'>
                  <div className='w-[max] space-y-1'>
                    <p className='bg-blue-500 dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      {el.content}
                    </p>
                    {el.msgChild?.map((child, i) => {
                      return (
                        <p className='bg-blue-500 dark:bg-slate-900 py-1 px-2 rounded-md break-words' key={i}>
                          {child.content}
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </QueryResult>
        </div>
        <div className='h-[20%] border-t flex'>
          <input
            type='text'
            name='message'
            placeholder='Type your message'
            className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black focus:outline-none focus:border-none'
          />
          <span className='icon flex items-center px-4 text-gray-500'>
            <BsSendFill size={20} />
          </span>
        </div>
      </div>
    </div >
  )
}

export default MiniChat