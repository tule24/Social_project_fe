import React from 'react'
import { AiFillPhone, AiFillMessage } from 'react-icons/ai'

function Contact({ el, i }) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center '>
                <div className="relative flex-shrink-0">
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border rounded-full text-gray-100 border-gray-900 bg-green-400`} />
                    <img src={el.ava} alt="ava" className="w-10 h-10 border rounded-full bg-gray-500 border-gray-700" />
                </div>
                <span className='font-semibold ml-2 capitalize'>{el.name}</span>
            </div>
            <div className='contact-format text-xl space-x-3 '>
                <AiFillPhone className='contact-btn' />
                <AiFillMessage className='contact-btn' />
            </div>
        </div>
    )
}

export default Contact