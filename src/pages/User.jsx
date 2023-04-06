import React, { useState } from 'react'
import { Contact, Post, UserInfo, QueryResult, PostSkeleton, LoadingSpiner } from '@/components'
import { useQuery } from '@apollo/client'
import { GET_USER_INFO, POST_OF_USER } from '@/graphql'
import { useParams } from 'react-router-dom'
import { HiOutlineInbox } from 'react-icons/hi'

function User() {
    const { userId } = useParams()
    const queryInfo = useQuery(GET_USER_INFO, { variables: { userId } })
    const queryPost = useQuery(POST_OF_USER, { variables: { userId, page: 1 } })
    const [isEnd, setIsEnd] = useState(false)
    const handleScroll = ({ currentTarget }) => {
        if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
            if (queryPost.data && queryPost.data.postOfUser) {
                if (!isEnd) {
                    const page = Math.floor(queryPost.data.postOfUser.length / 5) + 1
                    queryPost.fetchMore({
                        variables: { page },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev
                            if (fetchMoreResult.postOfUser.length < 5) {
                                setIsEnd(true)
                            }
                            const newPost = fetchMoreResult.postOfUser.filter(el => !prev.postOfUser.find(post => post.id === el.id))
                            return Object.assign({}, prev, {
                                postOfUser: [...prev.postOfUser, ...newPost]
                            })
                        }
                    })
                }
            }
        }
    }
    return (
        <div className='layout-parent' onScroll={handleScroll}>
            <div className='layout-parent-left'>
                <QueryResult loading={queryInfo.loading} error={queryInfo.error} data={queryInfo.data} skeleton={<LoadingSpiner />}>
                    <UserInfo user={queryInfo?.data?.user} />
                </QueryResult>
            </div>
            <div className='layout-parent-center'>
                <QueryResult loading={queryInfo.loading} error={queryInfo.error} data={queryInfo.data} skeleton={<LoadingSpiner />}>
                    <div className='xl:hidden block mb-5'>
                        <UserInfo user={queryInfo?.data?.user} />
                    </div>
                </QueryResult>
                <div className='layout-parent-center-child'>
                    <QueryResult loading={queryPost.loading} error={queryPost.error} data={queryPost.data} skeleton={<PostSkeleton />}>
                        {queryPost?.data?.postOfUser?.map(el => <Post key={el.id} post={el} user={queryInfo?.data?.user} />)}
                    </QueryResult>
                    {isEnd && <div className='flex flex-col items-center text-gray-400'>
                        <HiOutlineInbox size={30} />
                        <p className='text-sm'>Nothing to view more</p>
                    </div>}
                </div>
            </div>
            <Contact />
        </div>
    )
}

export default User