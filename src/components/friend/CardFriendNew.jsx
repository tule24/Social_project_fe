import React from 'react'
import { QueryResult } from '@/components'
import { FaRegEye, FaUserPlus } from 'react-icons/fa'
import { Tooltip } from '@/components'
import { useQuery } from '@apollo/client'

function CardFriendNew() {
    return (
        <div className='friend-card my-shadow mb-10'>
            <img alt="ava" className="friend-ava" src="" />
            <h1 className='text-lg font-semibold capitalize'>abc</h1>
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