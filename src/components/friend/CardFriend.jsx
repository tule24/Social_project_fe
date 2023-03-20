import React from 'react'
import { FaRegEye, FaUserMinus } from 'react-icons/fa'
import { Tooltip } from '@/components'

function CardFriend({ user }) {
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src={user.ava} />
            <h1 className='text-lg font-semibold capitalize'>{user.name}</h1>
            <div className='w-full grid grid-cols-2'>
                <Tooltip message={'Unfriend'} position={"left-7"}>
                    <button className='friend-btn rounded-bl-md '><FaUserMinus className='mx-auto text-2xl text-red-500' /></button>
                </Tooltip>
                <Tooltip message={'View info'} position={"left-7"}>
                    <button className='friend-btn rounded-br-md '><FaRegEye className='mx-auto text-2xl' /></button>
                </Tooltip>
            </div>
        </div>
    )
}

export default CardFriend