import React, { useContext, useEffect, useState } from 'react'
import { Contact, Post, UserInfo, UserStat, QueryResult } from '@/components'
import { useQuery } from '@apollo/client'
import { GET_USER_INFO, POST_OF_USER } from '@/graphql'
import { SocialContext } from '@/context'

function Profile() {
    const queryUser = useQuery(GET_USER_INFO)
    const queryPost = useQuery(POST_OF_USER)
    const { modal, setModal } = useContext(SocialContext)

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (queryUser.data && queryUser.data.user) {
            setUser(queryUser.data.user)
        }
    }, [queryUser.data])

    const [posts, setPosts] = useState([])
    useEffect(() => {
        if (queryPost.data && queryUser.data.postOfUser) {
            setPosts(queryUser.data.postOfUser)
        }
    }, [queryPost.data])
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[25%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <QueryResult loading={queryUser?.loading} error={queryUser?.error} data={queryUser?.data}>
                    <UserInfo user={user} modal={modal} setModal={setModal} />
                    <UserStat user={user} />
                </QueryResult>
            </div>
            <div className='w-[55%] mx-[20%]'>
                <div className='w-[70%] ml-[25%] space-y-10 pb-5'>
                    <QueryResult loading={queryPost?.loading} error={queryPost?.error} data={queryPost?.data}>
                        {posts.map(el => <Post key={el.id} post={el} user={user} />)}
                    </QueryResult>
                </div>
            </div>
            <Contact />
        </>
    )
}

export default Profile