import React from 'react'
import { Contact, Post, Weather, Calendar, QueryResult } from '@/components'
import { POST_FOR_USER } from '@/graphql'
import { useQuery } from '@apollo/client'

function Home() {
    const { loading, error, data } = useQuery(POST_FOR_USER, { variables: { page: 1 } })
    return (
        <>
            <div className='fixed h-screen left-0 top-[6rem] w-[24%] px-3 text-gray-800 dark:text-gray-100 space-y-8 overflow-auto pb-32'>
                <Weather />
                <Calendar />
            </div>
            <div className='w-[56%] mx-[20%]'>
                <div className='w-[70%] ml-[22%] space-y-10 pb-5'>
                    <QueryResult loading={loading} error={error} data={data}>
                        {data?.postForUser?.map(el => <Post key={el.id} post={el} />)}
                    </QueryResult>
                </div>
            </div>
            <Contact />
        </>
    )
}

export default Home