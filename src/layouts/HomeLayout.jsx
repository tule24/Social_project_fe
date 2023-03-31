import React, { useContext, useEffect } from 'react'
import { Header, HOCModal, MiniChat } from '@/components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { SocialContext } from '@/context'
import { useSubscription } from '@apollo/client'
import { MESSAGE_SUBSCRIPTION } from '@/graphql'

function HomeLayout() {
  const { miniChat, setMiniChat, messageRoom, setMessageRoom, userInfo } = useContext(SocialContext)
  const closeChat = (id) => {
    const newMiniChat = miniChat.filter(el => el.id !== id)
    setMiniChat([...newMiniChat])
  }

  const { data, error } = useSubscription(MESSAGE_SUBSCRIPTION)
  useEffect(() => {
    if (data && data.messageCreated && data.messageCreated) {
      const roomId = data.messageCreated.roomId
      const newMsg = data.messageCreated.content.pop()
      const creator = data.messageCreated.creator
      const index = messageRoom.findIndex(room => room.id === roomId)
      if (index >= 0) {
        messageRoom[index].newMessage = true
        messageRoom[index].updatedAt = newMsg.createdAt
        messageRoom[index].lastMessage = { ...messageRoom[index].lastMessage, creatorId: creator.id, content: newMsg.message }
        setMessageRoom([...messageRoom])
      }
    }
  }, [data])
  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <div className='bg-white dark:bg-black relative'>
      <Header />
      <div className='dark:bg-zinc-900 bg-gray-200 min-h-screen w-screen pt-24 px-10'>
        <Outlet />
      </div>
      <HOCModal />
      <div className='fixed bottom-5 w-max right-[20%] flex justify-end space-x-2'>
        {miniChat.map(el => <MiniChat room={el} closeChat={closeChat} userId={userInfo.id} key={el.id} />)}
      </div>
      <ToastContainer closeButton={true} position='top-right' style={{ width: "max-content" }} />
    </div>
  )
}

export default HomeLayout
