import React from 'react'
import { Contact, Post, Weather, Calendar } from '@/components'
const FRIEND = ["John", "Smith", "Anna", "Tiffany", "Andrew", "Law Shalk", "Addy", "Zeus"]

function Home() {
    return (
        <div className='dark:bg-zinc-900 bg-gray-200 min-h-screen w-screen pt-24 px-10'>
            <div className='fixed h-screen left-0 top-[6rem] w-[24%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <Weather />
                <Calendar/>
            </div>
            <div className='w-[56%] mx-[20%]'>
                <div className='w-[70%] ml-[22%] space-y-10 pb-5'>
                    <Post />
                    <Post />
                </div>
            </div>
            <div className='space-y-5 fixed h-screen right-0 top-[6rem] w-[20%] px-3 text-gray-800 dark:text-gray-100 shadow-xl'>
                <h1 className='text-3xl font-semibold tracking-widest'>Contacts</h1>
                {FRIEND.map((el, i) => {
                    return <Contact el={el} i={i} key={i} />
                })}
            </div>
        </div>
    )
}

export default Home