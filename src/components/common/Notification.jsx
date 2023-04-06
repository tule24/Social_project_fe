import { GET_NOTIFICATION } from '@/graphql'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { LoadingSpiner, QueryResult } from '.'
import { useNavigate } from 'react-router-dom'
import { PostNoti } from '../modal'

function Notification({ setOpenNoti, modal, setModal, user }) {
    const { loading, error, data, fetchMore } = useQuery(GET_NOTIFICATION, { variables: { page: 1 } })
    const navigate = useNavigate()
    const handleClick = (noti) => {
        if (noti.content.includes('friend')) {
            setOpenNoti(false)
            navigate('/friend')
        } else if (noti.content.includes('post')) {
            setOpenNoti(false)
            setModal({
                ...modal,
                open: true,
                component: <PostNoti postId={noti.contentId} user={user} modal={modal} setModal={setModal} />
            })
        }
    }

    const [isMore, setIsMore] = useState(true)
    const handleFetch = () => {
        if (data && data.getNotification) {
            const page = Math.floor(data.getNotification.length / 10) + 1
            fetchMore({
                variables: { page },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev
                    if (fetchMoreResult.getNotification.length < 10) {
                        setIsMore(false)
                    }
                    const newNoti = fetchMoreResult.getNotification.filter(el => !prev.getNotification.find(noti => noti.id === el.id))
                    return Object.assign({}, prev, {
                        getNotification: [...prev.getNotification, ...newNoti]
                    })
                }
            })
        }
    }
    return (
        <div className='noti'>
            <button onClick={() => setOpenNoti(false)} className='absolute right-2 top-0.5'><AiOutlineClose size={20} className='hover:text-gray-500 text-black' /></button>
            <h1 className='text-center font-semibold tracking-widest'>Notification</h1>
            <div className='border-t border-gray-500 mt-2'>
                <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
                    {data?.getNotification?.map(noti => {
                        return (
                            <div key={noti.id} className='noti-item' onClick={() => handleClick(noti)}>
                                <img src={noti.from.ava} alt="ava" className='rounded-full w-8 h-8' />
                                <p className='text-sm'><span className='font-semibold'>{noti.from.name} </span>{noti.content}</p>
                            </div>
                        )
                    })}
                </QueryResult>
                {isMore ? <button className='noti-btn cursor-pointer' onClick={handleFetch}>
                    <p className='font-semibold text-sm'>VIEW MORE</p>
                </button> : <button className='noti-btn' disabled>
                    <p className='font-semibold text-sm'>No more</p>
                </button>}
            </div>
        </div>
    )
}

export default Notification