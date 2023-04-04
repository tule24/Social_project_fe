import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useQuery } from '@apollo/client'
import { LoadingSpiner, QueryResult } from '.'
import { updateLikePost, updateLikeComment, updateLikeReplies } from '@/services'
function UserLike({ query, args, setShowLike, opt }) {
    const { loading, error, data } = useQuery(query, { variables: args })
    const [queryData, setQueryData] = useState([])
    useEffect(() => {
        if (data) {
            switch (opt) {
                case 'post':
                    const likePostData = data?.post?.userLike || []
                    setQueryData([...likePostData])
                    updateLikePost(args.postId, likePostData.length)
                    break
                case 'comment':
                    const likeCmtData = data?.commentById?.userLike || []
                    setQueryData([...likeCmtData])
                    updateLikeComment(args.commentId, likeCmtData.length)
                    break
                case 'replies':
                    const likeRepData = data?.repliesById?.userLike || []
                    setQueryData([...likeRepData])
                    updateLikeReplies(args.repliesId, likeRepData.length)
                    break
                default:
                    setQueryData([])
            }
        }
    }, [data])
    return (
        <div className='absolute bg-gray-400 w-max h-max top-0 -translate-y-full rounded-lg p-1 my-shadow'>
            <div className='flex items-center justify-between border-b border-gray-600 mb-1'>
                <p className='text-sm font-semibold'>User like</p>
                <button onClick={() => setShowLike(false)}><AiOutlineCloseCircle /></button>
            </div>
            <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
                {queryData?.map(el => {
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