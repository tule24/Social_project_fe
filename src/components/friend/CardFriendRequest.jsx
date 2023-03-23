import React from 'react'
import { FaRegEye, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { Tooltip } from '@/components'

function CardFriendRequest({ user }) {
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src={user.ava} loading='lazy'/>
            <h1 className='text-lg font-semibold capitalize'>{user.name}</h1>
            <div className='w-full grid grid-cols-3'>
                <Tooltip message={'Accept'} position={"left-3"}>
                    <button className='friend-btn rounded-bl-md '><FaUserCheck className='mx-auto text-2xl text-green-500' /></button>
                </Tooltip>
                <Tooltip message={'Reject'} position={"left-3"}>
                    <button className='friend-btn'><FaUserTimes className='mx-auto text-2xl text-red-500' /></button>
                </Tooltip>
                <Tooltip message={'View info'} position={"left-2"}>
                    <button className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></button>
                </Tooltip>
            </div>
        </div>
    )
}

export default CardFriendRequest