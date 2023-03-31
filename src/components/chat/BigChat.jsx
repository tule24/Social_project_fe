import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MESSAGE_ROOM } from '@/graphql'
import { LoadingSpiner, QueryResult } from '../common'
import { messageSubService } from '@/services'

function BigChat({ roomId, userId }) {
  const { subscribeToMore, loading, error, data } = useQuery(GET_MESSAGE_ROOM, { variables: { roomId } })
  const [msgData, setMsgData] = useState([])
  useEffect(() => {
    if (data) {
      let newMsgData = [...data.getMessageRoom.messages]
      newMsgData = newMsgData.reverse()
      setMsgData(newMsgData)
    }
  }, [data])
  useEffect(() => messageSubService(subscribeToMore), [])
  const bottomRef = useRef(null)
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [msgData])
  return (
    <div className='flex-grow shadow p-2 overflow-auto'>
      <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
        {msgData?.map(el => {
          return el.creator.id !== userId ? (
            <div className='flex items-end text-sm' key={el.id}>
              <img src={el.creator.ava} alt="ava" className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500 mr-1" />
              <div className='max-w-[40%] space-y-1 flex flex-col items-start'>
                {el.content.map(msg => {
                  return (
                    <p title={msg.createdAt} key={msg.createdAt} className='bg-slate-100 shadow dark:bg-slate-900 py-1 px-2 rounded-md break-words'>
                      {msg.message}
                    </p>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className='flex text-sm justify-end' key={el.id}>
              <div className='space-y-1 max-w-[40%] flex flex-col items-end'>
                {el.content.map(msg => {
                  return (
                    <p title={msg.createdAt} key={msg.createdAt} className='bg-blue-300 shadow py-1 px-2 rounded-md break-words'>
                      {msg.message}
                    </p>
                  )
                })}
              </div>
            </div>
          )
        })}
        {msgData?.length === 0 && <div className='flex justify-center items-center h-full'>
          <p className='text-sm text-gray-400 text-center'>You are now connected! <br /> Send your first message!</p>
        </div>}
        <span ref={bottomRef} />
      </QueryResult>
    </div>
  )
}

export default BigChat