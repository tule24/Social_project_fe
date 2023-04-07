import { Contact, Post, Weather, Calendar, QueryResult, PostSkeleton } from '@/components'
import { SocialContext } from '@/context'
import { POST_FOR_USER } from '@/graphql'
import { useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { HiOutlineInbox } from 'react-icons/hi'

function Home() {
    const { loading, error, data, fetchMore, refetch } = useQuery(POST_FOR_USER, { variables: { page: 1 }})
    const { userInfo, isRefetch, setIsRefetch } = useContext(SocialContext)
    const [isEnd, setIsEnd] = useState(false)
    const handleScroll = ({ currentTarget }) => {
        if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
            if (data && data.postForUser) {
                if (!isEnd) {
                    const page = Math.floor(data.postForUser.length / 5) + 1
                    fetchMore({
                        variables: { page },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev
                            if (fetchMoreResult.postForUser.length < 5) {
                                setIsEnd(true)
                            }
                            const newPost = fetchMoreResult.postForUser.filter(el => !prev.postForUser.find(post => post.id === el.id))
                            return Object.assign({}, prev, {
                                postForUser: [...prev.postForUser, ...newPost]
                            })
                        }
                    })
                }
            }
        }
    }

    useEffect(() => {
        if (isRefetch) {
            refetch()
            setIsRefetch(false)
            setIsEnd(false)
        }
    }, [isRefetch])

    return (
        <div className='layout-parent' onScroll={handleScroll}>
            <div className='layout-parent-left'>
                <Weather />
                <Calendar />
            </div>
            <div className='layout-parent-center'>
                <div className='layout-parent-center-child'>
                    <QueryResult loading={loading} error={error} data={data} skeleton={<PostSkeleton />}>
                        {data?.postForUser?.map(el => <Post key={el.id} post={el} user={userInfo} />)}
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

export default Home