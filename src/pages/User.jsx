import React, { useEffect } from 'react'
import { Contact, Post, UserInfo, QueryResult, PostSkeleton, LoadingSpiner } from '@/components'
import { useQuery } from '@apollo/client'
import { GET_USER_INFO, POST_OF_USER } from '@/graphql'
import { useParams } from 'react-router-dom'

function User() {
    const { userId } = useParams()
    const queryInfo = useQuery(GET_USER_INFO, { variables: { userId } })
    const queryPost = useQuery(POST_OF_USER, { variables: { userId, page: 1 } })
    return (
        <div>
            <div className='fixed h-screen left-0 top-[6rem] w-[25%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <QueryResult loading={queryInfo.loading} error={queryInfo.error} data={queryInfo.data} skeleton={<LoadingSpiner />}>
                    <UserInfo user={queryInfo?.data?.user} />
                </QueryResult>
            </div>
            <div className='w-[55%] mx-[20%]'>
                <div className='w-[70%] ml-[25%] space-y-10 pb-5'>
                    <QueryResult loading={queryPost.loading} error={queryPost.error} data={queryPost.data} skeleton={<PostSkeleton />}>
                        {queryPost?.data?.postOfUser?.map(el => <Post key={el.id} post={el} user={queryInfo?.data?.user} />)}
                    </QueryResult>
                </div>
            </div>
            <Contact />
        </div>
    )
}

export default User