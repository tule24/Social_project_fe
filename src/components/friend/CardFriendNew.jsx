import React from 'react'
import { Tooltip } from '@/components'
import { FaRegEye, FaUserPlus } from 'react-icons/fa'

function CardFriendNew({user}) {
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src={user.ava} loading='lazy'/>
            <h1 className='text-lg font-semibold capitalize'>{user.name}</h1>
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
}

export default CardFriendNew