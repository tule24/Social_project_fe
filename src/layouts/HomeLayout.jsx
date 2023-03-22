import React from 'react'
import { Header, HOCModal, MiniChat } from '@/components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function HomeLayout() {
  return (
    <div className='bg-white dark:bg-black'>
      <Header />
      <div className='dark:bg-zinc-900 bg-gray-200 min-h-screen w-screen pt-24 px-10'>
        <Outlet />
      </div>
      <HOCModal />
      <MiniChat />
      <ToastContainer closeButton={true} position='top-right' style={{ width: "max-content" }} />
    </div>
  )
}

export default HomeLayout
