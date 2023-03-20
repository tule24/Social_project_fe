import React, { useState } from 'react'
import { CardFriend, CardFriendNew, CardFriendWaiting, CardFriendRequest, QueryResult } from '@/components'
import { useQuery } from '@apollo/client'
import { FRIEND_OF_OWNER } from '@/graphql'
const TAB_FRIEND = ['Your friend', 'Friend request', 'Friend waiting', 'Find new friend']

function Friend() {
    const [tab, setTab] = useState('Your friend')
    const { loading, error, data } = useQuery(FRIEND_OF_OWNER)
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
            <QueryResult data={data} loading={loading} error={error}>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Your friend' ? 'block' : 'hidden'}`}>
                    {data?.user?.friendList?.filter(el => el.status === 'confirm').map(user => <CardFriend user={user} />)}
                </div>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend waiting' ? 'block' : 'hidden'}`}>
                    {data?.user?.friendList?.filter(el => el.status === 'waiting').map(user => <CardFriendWaiting user={user} />)}
                </div>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend request' ? 'block' : 'hidden'}`}>
                    {data?.user?.friendList?.filter(el => el.status === 'request').map(user => <CardFriendRequest user={user} />)}
                </div>
            </QueryResult>
            <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Find new friend' ? 'block' : 'hidden'}`}>
                <CardFriendNew />
            </div>
        </div >
    )
}

export default Friend

//             