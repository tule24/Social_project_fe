import React, { useEffect, useState } from 'react'
import { CardFriend, CardFriendNew, CardFriendWaiting, CardFriendRequest, QueryResult, FriendSkeleton } from '@/components'
import { GET_FRIEND_LIST } from '@/graphql'
import { useQuery } from '@apollo/client'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
const TAB_FRIEND = ['Your friend', 'Friend request', 'Friend waiting', 'Find new friend']

function Friend() {
    const [tab, setTab] = useState(0)
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

    const handleSlide = (num) => {
        setTab(tab + num)
    }
    return (
        <div className='layout-parent'>
            <div className='xl:w-3/4 mx-auto pb-10 text-gray-800 dark:text-gray-100 overflow-y-auto scrollbar-hide'>
                <div className="friend-top-tab">
                    {TAB_FRIEND.map((el, i) => {
                        return (
                            <button key={i} className={`friend-tab ${tab === i
                                ? 'friend-tab-active'
                                : 'friend-tab-not-active'}`}
                                onClick={() => setTab(i)}
                            >
                                {el}
                            </button>
                        )
                    })}
                </div>
                <div className="flex w-full justify-between sm:hidden">
                    <button
                        className={`rounded-full p-2 text-white cursor-pointer ${tab === 0 ? 'bg-gray-300 dark:bg-zinc-800/50' : 'bg-black/50'}`}
                        disabled={tab === 0}
                        onClick={() => handleSlide(-1)}
                    >
                        <BsChevronCompactLeft size={15} />
                    </button>
                    <p className='text-2xl font-semibold capitalize'>{TAB_FRIEND[tab]}</p>
                    <button
                        className={`rounded-full p-2 text-white cursor-pointer ${tab === 3 ? 'bg-gray-300 dark:bg-zinc-800/50' : 'bg-black/50'}`}
                        disabled={tab === 3}
                        onClick={() => handleSlide(1)}
                    >
                        <BsChevronCompactRight size={15} />
                    </button>
                </div>
                <QueryResult loading={loading} data={data} error={error} skeleton={<FriendSkeleton />}>
                    <div className={`grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-32 ${tab === 0 ? 'block' : 'hidden'}`}>
                        {friend.confirm?.map(user => <CardFriend user={user} key={user.id} />)}
                    </div>
                    <div className={`grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-32 ${tab === 1 ? 'block' : 'hidden'}`}>
                        {friend.waiting?.map(user => <CardFriendWaiting user={user} key={user.id} />)}
                    </div>
                    <div className={`grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-32 ${tab === 2 ? 'block' : 'hidden'}`}>
                        {friend.request?.map(user => <CardFriendRequest user={user} key={user.id} />)}
                    </div>
                </QueryResult>
                <div className={`grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 mt-32 ${tab === 3 ? 'block' : 'hidden'}`}>
                    <CardFriendNew />
                </div>
            </div >
        </div>
    )
}

export default Friend

//             