import React, { useContext } from 'react'
import { Contact, Post, UserInfo, UserStat } from '@/components'
import { SocialContext } from '@/context'

function Profile() {
    const { userInfo, friendList: { confirm }, modal, setModal } = useContext(SocialContext)
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[25%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <UserInfo user={userInfo} modal={modal} setModal={setModal} />
                <UserStat totalFriend={confirm.length} />
            </div>
            <div className='w-[55%] mx-[20%]'>
                <div className='w-[70%] ml-[25%] space-y-10 pb-5'>
                    <Post />
                    <Post />
                </div>
            </div>
            <Contact friends={confirm} />
        </>
    )
}

export default Profile