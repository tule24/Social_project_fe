import React from 'react'
import { BiEnvelope, BiPhone, BiHome, BiEdit, BiCake } from 'react-icons/bi'
function UserInfo() {
    return (
        <div className="flex flex-col max-w-md p-4 mx-auto rounded-lg dark:text-gray-100 dark:bg-zinc-800 my-shadow">
            <img src="https://source.unsplash.com/150x150/?portrait?3" alt className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
            <div className="space-y-4 divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                    <h2 className="text-xl font-semibold sm:text-2xl text-center">Leroy Jenkins <sup><BiEdit className='inline cursor-pointer'/></sup></h2>
                </div>
                <div className="space-y-2 pt-5">
                    <p className='flex items-center flex-wrap'><BiCake className='mr-1 inline'/>DOB: &nbsp;<span className='font-semibold'>27/02/1997</span></p>
                    <p className='flex items-center flex-wrap'><BiEnvelope className='mr-1 inline'/>Email: &nbsp;<span className='font-semibold'>abc@gmail.com</span></p>
                    <p className='flex items-center flex-wrap'><BiPhone className='mr-1 inline'/>Phone: &nbsp;<span className='font-semibold'>0958 555 999</span></p>
                    <p className='flex items-center flex-wrap'><BiHome className='mr-1 inline'/>Address: &nbsp;<span className='font-semibold'>12 Khong Street, HCM City, VN</span></p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo