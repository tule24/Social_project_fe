import React, { useState } from 'react'
import { FriendSkeleton, QueryResult, Tooltip } from '@/components'
import { FaRegEye, FaUserPlus } from 'react-icons/fa'
import { GET_NEW_FRIEND, ADD_FRIEND } from '@/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { addFriendService } from '@/services'
import { FiLoader } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function CardFriendNew() {
    const [isloading, setIsLoading] = useState('')
    const { data, loading, error, fetchMore } = useQuery(GET_NEW_FRIEND, { variables: { page: 1 } })
    const [addFriend] = useMutation(ADD_FRIEND)
    const handleAddFriend = (friendId) => {
        setIsLoading(friendId)
        addFriend(addFriendService(friendId))
    }
    const [isMore, setIsMore] = useState(true)
    const handleFetch = () => {
        if (data && data.users) {
            const page = Math.floor(data.users.length / 5) + 1
            fetchMore({
                variables: { page },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    if (fetchMoreResult.users.length < 5) {
                        setIsMore(false)
                    }
                    const newUser = fetchMoreResult.users.filter(el => !prev.users.find(user => user.id === el.id))
                    return Object.assign({}, prev, {
                        users: [...prev.users, ...newUser]
                    })
                }
            })
        }
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
                            <Link to={`/user/${el.id}`} className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></Link>
                        </Tooltip>
                    </div>
                </div>)
            })}
            {isMore ? <button className='flex justify-center items-center cursor-pointer' onClick={handleFetch}>
                <p className='font-semibold text-xl'>VIEW MORE</p>
            </button> : <button className='flex justify-center items-center' disabled>
                <p className='font-semibold text-xl'>No more</p>
            </button>}
        </QueryResult>
    )
}

export default CardFriendNew