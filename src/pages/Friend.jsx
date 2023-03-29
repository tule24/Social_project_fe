import React, { useEffect, useState } from 'react'
import { CardFriend, CardFriendNew, CardFriendWaiting, CardFriendRequest, QueryResult, FriendSkeleton } from '@/components'
import { GET_FRIEND_LIST } from '@/graphql'
import { useQuery } from '@apollo/client'
const TAB_FRIEND = ['Your friend', 'Friend request', 'Friend waiting', 'Find new friend']

function Friend() {
    const [tab, setTab] = useState('Your friend')
    const [friend, setFriend] = useState({
        confirm: [],
        waiting: [],
        request: []
    })
    const { data, loading, error } = useQuery(GET_FRIEND_LIST)
    useEffect(() => {
        if (data && data.friendOfUser) {
            const { friendOfUser } = data
            const confirm = []
            const waiting = []
            const request = []
            friendOfUser.forEach(el => {
                if (el.status === 'confirm') { confirm.push(el) }
                if (el.status === 'waiting') { waiting.push(el) }
                if (el.status === 'request') { request.push(el) }
                setFriend({ confirm: [...confirm], waiting: [...waiting], request: [...request] })
            })
        }
    }, [data])

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
            <QueryResult loading={loading} data={data} error={error} skeleton={<FriendSkeleton />}>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Your friend' ? 'block' : 'hidden'}`}>
                    {friend.confirm?.map(user => <CardFriend user={user} key={user.id} />)}
                </div>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend waiting' ? 'block' : 'hidden'}`}>
                    {friend.waiting?.map(user => <CardFriendWaiting user={user} key={user.id} />)}
                </div>
                <div className={`grid grid-cols-4 gap-5 mt-32 ${tab === 'Friend request' ? 'block' : 'hidden'}`}>
                    {friend.request?.map(user => <CardFriendRequest user={user} key={user.id} />)}
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