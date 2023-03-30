import React, { useEffect, useContext } from 'react'
import { Header, HOCModal, MiniChat } from '@/components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSubscription } from '@apollo/client'
import { MESSAGE_SUBSCRIPTION } from '@/graphql'
import { SocialContext } from '@/context'

function HomeLayout() {
  const { data, error } = useSubscription(MESSAGE_SUBSCRIPTION)
  useEffect(() => {
    data && console.log(data.messageCreated)
  }, [data])
  useEffect(() => {
    console.log(error)
  }, [error])

  const { miniChat, setMiniChat, userInfo } = useContext(SocialContext)
  const closeChat = (id) => {
    const newMiniChat = miniChat.filter(el => el.id !== id)
    setMiniChat([...newMiniChat])
  }
  return (
    <div className='bg-white dark:bg-black relative'>
      <Header />
      <div className='dark:bg-zinc-900 bg-gray-200 min-h-screen w-screen pt-24 px-10'>
        <Outlet />
      </div>
      <HOCModal />
      {miniChat.map(el => <MiniChat room={el} closeChat={closeChat} userId={userInfo.id} key={el.id} />)}
      <ToastContainer closeButton={true} position='top-right' style={{ width: "max-content" }} />
    </div>
  )
}

export default HomeLayout
