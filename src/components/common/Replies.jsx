import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { REPLIES_OF_COMMENT, CREATE_REPLIES, UPDATE_REPLIES, DELETE_REPLIES, LIKE_REPLIES, UNLIKE_REPLIES } from '@/graphql'
import { CmtRep, QueryResult, CommentSkeleton } from '@/components'
import { BsSendFill } from 'react-icons/bs'
import { createRepliesService, updateRepliesService, deleteRepliesService, likeRepliesService, unlikeRepliesService } from '@/services'
import { FiLoader } from 'react-icons/fi'
import { TbRefresh } from 'react-icons/tb'

function Replies({ commentId, totalReplies }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(REPLIES_OF_COMMENT, { variables: { commentId }, notifyOnNetworkStatusChange: true })
    const [createReplies] = useMutation(CREATE_REPLIES)
    const [updateReplies] = useMutation(UPDATE_REPLIES)
    const [deleteReplies] = useMutation(DELETE_REPLIES)
    const [likeReplies] = useMutation(LIKE_REPLIES)
    const [unlikeReplies] = useMutation(UNLIKE_REPLIES)

    const [loadingRep, setLoadingRep] = useState(false)
    const textRep = useRef(null)
    const handleKeydown = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            handleSubmit()
        }
    }
    const handleSubmit = () => {
        const content = textRep.current.value
        if (content.trim() !== '') {
            setLoadingRep(true)
            createReplies(createRepliesService(commentId, content, setLoadingRep))
            textRep.current.value = ''
        }
    }

    return (
        <div className='mt-2 relative'>
            <button className='absolute right-0 cursor-pointer z-10 text-gray-500 dark:text-gray-400 hover:text-black' title='refresh' onClick={() => refetch()}><TbRefresh size={15}/></button>
            {totalReplies > 0
                ? <QueryResult loading={loading} error={error} data={data} skeleton={<CommentSkeleton />} networkStatus={networkStatus}>
                    {data?.repliesOfComment?.map(el => <CmtRep
                        key={el.id}
                        parentId={commentId}
                        obj={el}
                        opt='replies'
                        updateFunc={updateReplies}
                        updateSer={updateRepliesService}
                        deleteFunc={deleteReplies}
                        deleteSer={deleteRepliesService}
                        likeFunc={likeReplies}
                        likeSer={likeRepliesService}
                        unlikeFunc={unlikeReplies}
                        unlikeSer={unlikeRepliesService}
                    />)}
                </QueryResult>
                : ''
            }
            <div className='flex border-gray-400 justify-center' >
                <div className='w-full h-[2.5rem] flex rounded-full border border-black dark:border-gray-500'>
                    <textarea
                        type='text'
                        name='replies'
                        placeholder='Type your replies'
                        className='chat-area scrollbar-hide'
                        onKeyDown={handleKeydown}
                        required
                        ref={textRep}
                    />
                    <button className='icon flex items-center sm:px-4 px-3 cursor-pointer' disabled={loadingRep} onClick={handleSubmit}>
                        {loadingRep ? <FiLoader className='animate-spin' /> : <BsSendFill size={20} />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Replies