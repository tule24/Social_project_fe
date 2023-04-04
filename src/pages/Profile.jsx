import React, { useContext } from 'react'
import { Contact, Post, UserInfo, UserStat, QueryResult, PostSkeleton } from '@/components'
import { useQuery } from '@apollo/client'
import { POST_OF_OWNER } from '@/graphql'
import { SocialContext } from '@/context'

function Profile() {
    const { loading, error, data } = useQuery(POST_OF_OWNER, { variables: { page: 1 } })
    const { userInfo, messageRoom, modal, setModal } = useContext(SocialContext)
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[25%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <UserInfo user={userInfo} modal={modal} setModal={setModal} />
                <UserStat totalFriend={messageRoom.length} totalPost={data?.postOfOwner?.length} />
            </div>
            <div className='w-[55%] mx-[20%]'>
                <div className='w-[70%] ml-[25%] space-y-10 pb-5'>
                    <QueryResult loading={loading} error={error} data={data} skeleton={<PostSkeleton />}>
                        {data?.postOfOwner?.map(el => <Post key={el.id} post={el} user={userInfo} />)}
                    </QueryResult>
                </div>
            </div>
            <Contact />
        </>
    )
}

export default Profile