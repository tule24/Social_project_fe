import React from 'react'
import { QueryResult } from '@/components'
import { ALL_USER } from '@/graphql'
import { FaRegEye, FaUserPlus } from 'react-icons/fa'
import { Tooltip } from '@/components'

function CardFriendNew() {
    const { loading, error, data } = useQuery(ALL_USER)
    return (
        <QueryResult data={data} loading={loading} error={error}>
            {data?.users?.users.map(user => {
                return (
                    <div className='friend-card my-shadow'>
                        <img alt="ava" className="friend-ava" src={user.ava} />
                        <h1 className='text-lg font-semibold'>{user.name}</h1>
                        <div className='w-full grid grid-cols-2'>
                            <Tooltip message={'Add friend'} position={"left-5"}>
                                <button className='friend-btn rounded-bl-md '><FaUserPlus className='mx-auto text-2xl text-green-500' /></button>
                            </Tooltip>
                            <Tooltip message={'View info'} position={"left-7"}>
                                <button className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></button>
                            </Tooltip>
                        </div>
                    </div>
                )
            })}
        </QueryResult>
    )
}

export default CardFriendNew