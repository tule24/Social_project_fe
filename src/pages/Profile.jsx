import React, { useContext, useState } from 'react'
import { Contact, Post, UserInfo, UserStat, QueryResult, PostSkeleton } from '@/components'
import { useQuery } from '@apollo/client'
import { POST_OF_OWNER } from '@/graphql'
import { SocialContext } from '@/context'
import { HiOutlineInbox } from 'react-icons/hi'

function Profile() {
    const { loading, error, data, fetchMore } = useQuery(POST_OF_OWNER, { variables: { page: 1 } })
    const { userInfo, messageRoom, modal, setModal } = useContext(SocialContext)
    const [isEnd, setIsEnd] = useState(false)
    const handleScroll = ({ currentTarget }) => {
        if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
            if (data && data.postOfOwner) {
                if (!isEnd) {
                    const page = Math.floor(data.postOfOwner.length / 5) + 1
                    fetchMore({
                        variables: { page },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev
                            if (fetchMoreResult.postOfOwner.length < 5) {
                                setIsEnd(true)
                            }
                            const newPost = fetchMoreResult.postOfOwner.filter(el => !prev.postOfOwner.find(post => post.id === el.id))
                            return Object.assign({}, prev, {
                                postOfOwner: [...prev.postOfOwner, ...newPost]
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
                <UserInfo user={userInfo} modal={modal} setModal={setModal} />
                <UserStat totalFriend={messageRoom.length} totalPost={data?.postOfOwner?.length} />
            </div>
            <div className='layout-parent-center'>
                <div className='xl:hidden block mb-5'>
                    <UserInfo user={userInfo} modal={modal} setModal={setModal} />
                </div>
                <div className='layout-parent-center-child'>
                    <QueryResult loading={loading} error={error} data={data} skeleton={<PostSkeleton />}>
                        {data?.postOfOwner?.map(el => <Post key={el.id} post={el} user={userInfo} isProfile={true}/>)}
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

export default Profile