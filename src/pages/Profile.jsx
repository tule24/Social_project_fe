import React, { useContext } from 'react'
import { Contact, Post, UserInfo, UserStat } from '@/components'
import { SocialContext } from '@/context'
import { SiMessenger } from 'react-icons/si'

function Profile() {
    const { userInfo, friendList: { confirm } } = useContext(SocialContext)
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[25%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <UserInfo user={userInfo} />
                <UserStat totalFriend={confirm.length} />
            </div>
            <div className='w-[55%] mx-[20%]'>
                <div className='w-[70%] ml-[25%] space-y-10 pb-5'>
                    <Post />
                    <Post />
                </div>
            </div>
            <div className='fixed space-y-4 h-screen right-0 top-[6rem] w-[20%] px-3 text-gray-800 dark:text-gray-100 shadow-xl'>
                <h1 className='text-3xl font-semibold tracking-widest flex items-center'>Contacts <SiMessenger className='ml-3' size={20}/></h1>
                <label htmlFor="Search" className="hidden">Search</label>
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                            <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-500 dark:text-gray-100">
                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                            </svg>
                        </button>
                    </span>
                    <input
                        type="search"
                        name="Search"
                        placeholder="Search..."
                        className="w-full py-2 pl-10 text-sm border border-gray-300 dark:border-zinc-700 rounded-full focus:outline-none bg-gray-200 dark:bg-zinc-700 text-gray-100 focus:text-black dark:focus:text-gray-300 focus:bg-gray-300 dark:focus:bg-gray-600 focus:border-violet-400" />
                </div>
                <div className='space-y-6'>
                    {confirm.map((el, i) => {
                        return <Contact el={el} i={i} key={i} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Profile