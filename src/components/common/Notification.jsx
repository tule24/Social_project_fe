import { GET_NOTIFICATION } from '@/graphql'
import { useQuery } from '@apollo/client'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { LoadingSpiner, QueryResult } from '.'
import { useNavigate } from 'react-router-dom'
import { PostNoti } from '../modal'

function Notification({ setOpenNoti, modal, setModal, user }) {
    const { loading, error, data } = useQuery(GET_NOTIFICATION, { variables: { page: 1 } })
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
                component: <PostNoti postId={noti.contentId} user={user} modal={modal} setModal={setModal}/>
            })
        }
    }
    return (
        <div className='absolute bg-gray-200 mt-2 right-[5rem] w-[18rem] overflow-auto max-h-[45vh] rounded-md my-shadow'>
            <button onClick={() => setOpenNoti(false)} className='absolute right-2 top-0.5'><AiOutlineClose size={20} className='hover:text-gray-500 text-black' /></button>
            <h1 className='text-center font-semibold tracking-widest'>Notification</h1>
            <div className='border-t border-gray-500 mt-2'>
                <QueryResult loading={loading} error={error} data={data} skeleton={<LoadingSpiner />}>
                    {data?.getNotification?.map(noti => {
                        return (
                            <div key={noti.id} className='flex items-center space-x-3 p-2 border-b border-gray-300 hover:bg-gray-300 cursor-pointer' onClick={() => handleClick(noti)}>
                                <img src={noti.from.ava} alt="ava" className='rounded-full w-8 h-8' />
                                <p className='text-sm'><span className='font-semibold'>{noti.from.name} </span>{noti.content}</p>
                            </div>
                        )
                    })}
                    {data?.getNotification?.length === 0 && <div className='text-center text-sm py-2'>No notification to show</div>}
                </QueryResult>
            </div>
        </div>
    )
}

export default Notification