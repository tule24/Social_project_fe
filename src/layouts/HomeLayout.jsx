import React from 'react'
import { Header } from '@/components'
import { Outlet } from 'react-router-dom'
function HomeLayout() {
  return (
    <div className='bg-white dark:bg-black'>
      <Header />
      <div className='dark:bg-zinc-900 bg-gray-200 min-h-screen w-screen pt-24 px-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default HomeLayout
