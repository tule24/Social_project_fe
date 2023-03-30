import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useQuery } from '@apollo/client'
import { USER_LIKE_POST } from '@/graphql'
import { LoadingSpiner, QueryResult } from '.'
function UserLike({ postId, setShowLike }) {
    const { loading, error, data } = useQuery(USER_LIKE_POST, { variables: { postId } })
    return (

        <div className='absolute bg-gray-400 w-max h-max top-0 -translate-y-full rounded-lg p-1 my-shadow'>
            <div className='flex items-center justify-between border-b border-gray-600 mb-1'>
                <p className='text-sm font-semibold'>User like</p>
                <button onClick={() => setShowLike(false)}><AiOutlineCloseCircle /></button>
            </div>
            <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
                {data?.post?.userLike?.map(el => {
                    return (
                        <div className='flex items-center space-x-1' key={el.id}>
                            <img alt="" src={el.ava} className="object-cover w-4 h-4 rounded-full shadow dark:bg-gray-500" />
                            <p className='text-sm capitalize'>{el.name}</p>
                        </div>
                    )
                })}
            </QueryResult>
        </div>
    )
}

export default UserLike