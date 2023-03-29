import React, { useState } from 'react'
import { FriendSkeleton, QueryResult, Tooltip } from '@/components'
import { FaRegEye, FaUserPlus } from 'react-icons/fa'
import { GET_NEW_FRIEND, ADD_FRIEND } from '@/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { addFriendService } from '@/services'
import { FiLoader } from 'react-icons/fi'

function CardFriendNew() {
    const [isloading, setIsLoading] = useState('')
    const { data, loading, error } = useQuery(GET_NEW_FRIEND)
    const [addFriend] = useMutation(ADD_FRIEND)
    const handleAddFriend = (friendId) => {
        setIsLoading(friendId)
        addFriend(addFriendService(friendId))
    }
    return (
        <QueryResult loading={loading} data={data} error={error} skeleton={<FriendSkeleton />}>
            {data?.users?.map(el => {
                return (<div className='friend-card my-shadow mb-10' key={el.id}>
                    <img alt="ava" className="friend-ava" src={el.ava} loading='lazy' />
                    <h1 className='text-lg font-semibold capitalize'>{el.name}</h1>
                    <div className='w-full grid grid-cols-2'>
                        <Tooltip message={'Add friend'} position={"left-5"}>
                            <button className='friend-btn rounded-bl-md' disabled={isloading === el.id} onClick={() => handleAddFriend(el.id)}>{isloading === el.id ? <FiLoader className='ml-2 animate-spin' /> : <FaUserPlus className='mx-auto text-2xl text-green-500' />}</button>
                        </Tooltip>
                        <Tooltip message={'View info'} position={"left-7"}>
                            <button className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></button>
                        </Tooltip>
                    </div>
                </div>)
            })}
        </QueryResult>
    )
}

export default CardFriendNew