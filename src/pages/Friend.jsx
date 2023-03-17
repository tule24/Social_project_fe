import React, { useState } from 'react'
import { CardFriend, CardFriendNew, CardFriendWaiting, CardFriendRequest } from '@/components'
const TAB_FRIEND = ['Your friend', 'Friend request', 'Friend waiting', 'Find new friend']
function Friend() {
    const [tab, setTab] = useState('Your friend')
    return (
        <div className='w-3/4 mx-auto pb-10 text-gray-800 dark:text-gray-100'>
            <div className="friend-top-tab">
                {TAB_FRIEND.map((el, i) => {
                    return (
                        <button key={i} className={`friend-tab ${tab === el
                            ? 'friend-tab-active'
                            : 'friend-tab-not-active'}`}
                            onClick={() => setTab(el)}
                        >
                            {el}
                        </button>
                    )
                })}
            </div>
            <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Your friend' ? 'block' : 'hidden'}`}>
                <CardFriend />
                <CardFriend />
                <CardFriend />
                <CardFriend />
            </div>
            <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Find new friend' ? 'block' : 'hidden'}`}>
                <CardFriendNew />
                <CardFriendNew />
                <CardFriendNew />
                <CardFriendNew />
            </div>
            <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend waiting' ? 'block' : 'hidden'}`}>
                <CardFriendWaiting />
                <CardFriendWaiting />
                <CardFriendWaiting />
                <CardFriendWaiting />
            </div>
            <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend request' ? 'block' : 'hidden'}`}>
                <CardFriendRequest />
                <CardFriendRequest />
                <CardFriendRequest />
                <CardFriendRequest />
            </div>
        </div >
    )
}

export default Friend

//             