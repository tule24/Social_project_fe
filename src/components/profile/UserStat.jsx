import React from 'react'
import { BiFile, BiGroup, BiLike } from 'react-icons/bi'
function UserStat() {
    return (
        <div className='space-y-5'>
            <div className="flex overflow-hidden rounded-lg dark:text-gray-100 dark:bg-zinc-800 my-shadow">
                <div className="flex items-center justify-center px-4 bg-gray-400 dark:bg-zinc-700 text-2xl">
                    <BiGroup />
                </div>
                <div className="flex items-center justify-between flex-1 p-3">
                    <p className="text-2xl font-semibold">200</p>
                    <p>Friends</p>
                </div>
            </div>
            <div className="flex overflow-hidden rounded-lg dark:text-gray-100 dark:bg-zinc-800 my-shadow">
                <div className="flex items-center justify-center px-4 bg-gray-400 dark:bg-zinc-700 text-2xl">
                    <BiFile />
                </div>
                <div className="flex items-center justify-between flex-1 p-3">
                    <p className="text-2xl font-semibold">200</p>
                    <p>Posts</p>
                </div>
            </div>
        </div>
    )
}

export default UserStat