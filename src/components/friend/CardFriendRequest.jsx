import React, { useState } from 'react'
import { FaRegEye, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { Tooltip } from '@/components'
import { FiLoader } from 'react-icons/fi'
import { CONFIRM_FRIEND } from '@/graphql'
import { useMutation } from '@apollo/client'
import { confirmFriendService } from '@/services'
import { Link } from 'react-router-dom'

function CardFriendRequest({ user }) {
    const [loading, setLoading] = useState('')
    const [confirmFriend] = useMutation(CONFIRM_FRIEND)
    const handleConfirmFriend = () => {
        setLoading('accept')
        confirmFriend(confirmFriendService(user.id))
    }
    const handleUnfriend = () => {
        setLoading('reject')
        unfriend(unFriendService(user.id))
    }
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src={user.ava} loading='lazy' />
            <h1 className='text-lg font-semibold capitalize'>{user.name}</h1>
            <div className='w-full grid grid-cols-3'>
                <Tooltip message={'Accept'} position={"left-3"}>
                    <button className='friend-btn rounded-bl-md ' disabled={loading === 'accept'} onClick={() => handleConfirmFriend()}>{loading === 'accept' ? <FiLoader className='ml-2 animate-spin' /> : <FaUserCheck className='mx-auto text-2xl text-green-500' />}</button>
                </Tooltip>
                <Tooltip message={'Reject'} position={"left-3"}>
                    <button className='friend-btn' disabled={loading === 'reject'} onClick={() => handleUnfriend()}>{loading === 'reject' ? <FiLoader className='ml-2 animate-spin' /> : <FaUserTimes className='mx-auto text-2xl text-red-500' />}</button>
                </Tooltip>
                <Tooltip message={'View info'} position={"left-2"}>
                    <Link to={`/user/${user.id}`} className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></Link>
                </Tooltip>
            </div>
        </div>
    )
}

export default CardFriendRequest