import React from 'react'
import { AiFillPhone, AiFillMessage } from 'react-icons/ai'
import { VscCircleFilled, VscCircle } from 'react-icons/vsc'
function Contact ({ el, i }){
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center '>
                <img src={`https://i.pravatar.cc/40?img=${i}`} alt="el" className='rounded-full block' />
                <div className='flex flex-col ml-2'>
                    <span className='font-semibold leading-tight'>{el}</span>
                    <span className='text-gray-400 dark:text-gray-700 flex items-center leading-tight'> {i % 2 ? <VscCircleFilled color='green' /> : <VscCircle />} {i % 2 ? "online" : "offline"}</span>
                </div>
            </div>
            <div className='flex items-center text-xl space-x-3 dark:text-gray-700 text-gray-400'>
                <AiFillPhone className='cursor-pointer dark:hover:text-gray-300 hover:text-gray-500'/>
                <AiFillMessage className='cursor-pointer dark:hover:text-gray-300 hover:text-gray-500'/>
            </div>
        </div>
    )
}

export default Contact