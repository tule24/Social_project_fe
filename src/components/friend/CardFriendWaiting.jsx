import React, { useState } from 'react'
import { FaRegEye, FaUserTimes } from 'react-icons/fa'
import { Tooltip } from '@/components'
import { FiLoader } from 'react-icons/fi'
import { UNFRIEND } from '@/graphql'
import { useMutation } from '@apollo/client'
import { unFriendService } from '@/services'
import { Link } from 'react-router-dom'

function CardFriendWaiting({ user }) {
    const [loading, setLoading] = useState(false)
    const [unfriend] = useMutation(UNFRIEND)
    const handleUnfriend = () => {
        setLoading(true)
        unfriend(unFriendService(user.id))
    }
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src={user.ava}/>
            <h1 className='text-lg font-semibold capitalize'>{user.name}</h1>
            <div className='w-full grid grid-cols-2'>
                <Tooltip message={'Cancel request'} position={"left-2"}>
                    <button className='friend-btn rounded-bl-md ' disabled={loading} onClick={() => handleUnfriend()}>{loading ? <FiLoader className='ml-2 animate-spin' /> : <FaUserTimes className='mx-auto text-2xl text-red-500' />}</button>
                </Tooltip>
                <Tooltip message={'View info'} position={"left-7"}>
                    <Link to={`/user/${user.id}`} className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></Link>
                </Tooltip>
            </div>
        </div>
    )
}

export default CardFriendWaiting