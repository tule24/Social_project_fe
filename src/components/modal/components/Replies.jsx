import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { REPLIES_OF_COMMENT, CREATE_REPLIES } from '@/graphql'
import { QueryResult } from '@/components'
import { AiFillLike, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { BsClockHistory, BsSendFill } from 'react-icons/bs'

const dummy = [
    {
        id: '1',
        creator: {
            id: 'a',
            name: 'peter',
            ava: 'https://i.pravatar.cc/400?img=70'
        },
        content: 'this is replies',
        createdAt: '11/02/2022',
        totalLike: 12
    },
    {
        id: '2',
        creator: {
            id: 'b',
            name: 'mary',
            ava: 'https://i.pravatar.cc/400?img=69'
        },
        content: 'this is mary',
        createdAt: '11/02/2022',
        totalLike: 10
    },
    {
        id: '3',
        creator: {
            id: 'c',
            name: 'mark',
            ava: 'https://i.pravatar.cc/400?img=68'
        },
        content: 'this is mark',
        createdAt: '11/02/2022',
        totalLike: 1
    }
]
function Replies({ commentId }) {
    // const { loading, error, data } = useQuery(REPLIES_OF_COMMENT, { variables: { commentId, page: 1 } })
    // const [createReplies] = useMutation(CREATE_REPLIES)
    const [loadingRep, setLoadingRep] = useState(false)
    const repRef = useRef(null)
    const textRep = useRef(null)
    const [rep, setRep] = useState("")
    const [editRep, setEditRep] = useState(null)
    const resizeTextArea = () => {
        repRef.current.style.height = "auto";
        repRef.current.style.height = repRef.current.scrollHeight + "px";
    }

    useEffect(() => {
        editRep && resizeTextArea()
    }, [rep])
    useEffect(() => {
        if (editRep) {
            const len = rep.length
            repRef.current.setSelectionRange(len, len)
        }
    }, [editRep])

    const handleEditRep = () => {
        console.log(rep)
        handleCloseEdit()
    }
    const handleCloseEdit = () => {
        setEditRep(null)
        setCmt(rep)
    }

    const handleCreateRep = () => {
        console.log(textRep.current.value)
    }
    // const handleReplies = async () => {
    //     setLoadingRep(true)
    //     createReplies({
    //         variables: {
    //             commentId,
    //             repliesText: textRep.current.value
    //         },
    //         refetchQueries: [{ query: REPLIES_OF_COMMENT }],
    //         onCompleted: () => { setLoadingRep(false) }
    //     })
    // }

    return (
        <div className='mt-2'>
            {dummy.map(el => {
                return (<div className='flex space-x-2 mb-4 relative' key={el.id}>
                    <div className='absolute w-[20%] z-0 -left-[2.5rem] top-[1.5rem] border-b-2 border-gray-400' />
                    <img src={el.creator.ava} alt="ava" className="object-cover w-10 h-10 z-10 rounded-full shadow dark:bg-gray-500 items-start" />
                    <div>
                        <div className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md w-max text-sm'>
                            <p className='font-semibold capitalize flex items-center'>{el.creator.name} <BsClockHistory title={el.createdAt} className='ml-2' size={10} /></p>
                            {editRep === el.id
                                ? <textarea
                                    ref={repRef}
                                    className='rep-area'
                                    value={rep}
                                    onChange={e => setRep(e.target.value)}
                                    style={{}}
                                    autoFocus />
                                : <p>{el.content}</p>}
                            {editRep === el.id && <div className='flex justify-end space-x-2 mt-1 text-sm'>
                                <button className='bg-green-500 px-2 rounded-lg hover:bg-green-300' onClick={() => handleEditRep()}>Submit</button>
                                <button className='bg-red-500 px-2 rounded-lg hover:bg-red-300' onClick={() => handleCloseEdit()}>Cancel</button>
                            </div>}
                        </div>
                        <div className='flex items-center space-x-2 text-sm'>
                            <button className="flex items-center space-x-1">
                                {el.liked ? <AiFillLike /> : <AiOutlineLike />}
                                <span>{el.totalLike}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-black" title='Edit comment' onClick={() => {setRep(el.content); setEditRep(el.id)}}>
                                <AiOutlineEdit />
                            </button>
                        </div>
                    </div>
                </div>)
            })}
            <div className='flex border-gray-400 justify-center' >
                <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500 py-1'>
                    <input
                        type='text'
                        name='comment'
                        placeholder='Input your replies'
                        className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black dark:text-gray-200 focus:outline-none focus:border-none'
                        ref={textRep}
                    />
                    <button className='icon flex items-center px-4 cursor-pointer' disabled={loadingRep} >
                        <BsSendFill size={20} />
                    </button>
                </div>
            </div>
        </div>
        // <QueryResult loading={loading} error={error} data={data}>
        //     {data?.repliesOfComment?.map(el => {
        //         return (<div className='flex space-x-3' key={el.id}>
        //             <img src={el.creator.ava} alt="ava" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500 items-start" />
        //             <div>
        //                 <div className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md w-max'>
        //                     <p className='font-semibold'>{el.creator.name}</p>
        //                     <p>{el.content}</p>
        //                 </div>
        //                 <div className='flex text-[12px] space-x-3 p-1 font-semibold dark:text-gray-200'>
        //                     <button className="flex items-center space-x-2">
        //                         <AiFillLike />
        //                         <span>{el.totalLike}</span>
        //                     </button>
        //                     <p className='flex items-center'><BsClockHistory /><span className='ml-1'>{el.createdAt}</span></p>
        //                 </div>
        //             </div>
        //         </div>)
        //     })}
        //     <div className='flex border-t border-gray-400 p-3 justify-center h-[10%]'>
        //         <div className='w-[95%] flex rounded-full border border-black dark:border-gray-500 py-2'>
        //             <input
        //                 type='text'
        //                 name='comment'
        //                 placeholder='Input your comment'
        //                 className='bg-white bg-opacity-0 w-[90%] pl-5 placeholder:text-sm text-black dark:text-gray-200 focus:outline-none focus:border-none'
        //                 ref={textRep}
        //             />
        //             <button className='icon flex items-center px-4 cursor-pointer' disabled={loadingRep} onClick={() => handleReplies()}>
        //                 <BsSendFill size={20} />
        //             </button>
        //         </div>
        //     </div>
        // </QueryResult>
    )
}

export default Replies