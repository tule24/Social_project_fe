import React, { useContext } from 'react'
import { Contact, Post, Weather, Calendar } from '@/components'
import { SocialContext } from '@/context'

function Home() {
    const { friendList: { confirm } } = useContext(SocialContext)
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[24%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <Weather />
                <Calendar />
            </div>
            <div className='w-[56%] mx-[20%]'>
                <div className='w-[70%] ml-[22%] space-y-10 pb-5'>
                    <Post />
                    <Post />
                </div>
            </div>
            <Contact friends={confirm} />
        </>
    )
}

export default Home