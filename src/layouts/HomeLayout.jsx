import React from 'react'
import { Header } from '@/components'
import { Outlet } from 'react-router-dom'
function HomeLayout() {
  return (
    <div className='bg-white dark:bg-black'>
      <Header />
      <Outlet />
    </div>
  )
}

export default HomeLayout
