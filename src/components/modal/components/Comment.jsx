import React, { useEffect, useRef, useState } from 'react'
import { AiFillLike, AiOutlineComment, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { BsClockHistory } from 'react-icons/bs'
import { Replies } from '.'

function Comment({ comment }) {
    const { id, creator, content, createdAt, liked, totalLike, totalReplies } = comment
    const cmtRef = useRef(null)
    const [cmt, setCmt] = useState(content)
    const [editCmt, setEditCmt] = useState(false)
    const resizeTextArea = () => {
        cmtRef.current.style.height = "auto";
        cmtRef.current.style.height = cmtRef.current.scrollHeight + "px";
    }

    useEffect(() => {
        editCmt && resizeTextArea()
    }, [cmt])
    useEffect(() => {
        if (editCmt) {
            const len = content.length
            cmtRef.current.setSelectionRange(len, len)
        }
    }, [editCmt])

    const handleSubmit = () => {
        console.log(cmt)
        handleCloseEdit()
    }
    const handleCloseEdit = () => {
        setEditCmt(false)
        setCmt(content)
    }

    const [openRep, setOpenRep] = useState(false)

    return (<div className='flex space-x-3 relative' key={id}>
        <div className='absolute w-10 h-[90%] z-0 bottom-2 left-8 rounded-bl-lg border-l-2 border-b-2 border-gray-400' />
        <img src={creator.ava} alt="ava" className="object-cover w-12 h-12 z-10 rounded-full shadow dark:bg-gray-500 items-start" />
        <div className='w-full'>
            <div className='bg-slate-200 dark:bg-slate-900 py-1 px-2 rounded-md w-max max-w-full'>
                <p className='font-semibold capitalize flex items-center'>{creator.name} <BsClockHistory title={createdAt} className='ml-2' size={10} /></p>
                {editCmt
                    ? <textarea
                        ref={cmtRef}
                        className='cmt-area'
                        value={cmt}
                        onChange={e => setCmt(e.target.value)}
                        style={{}}
                        autoFocus />
                    : <p>{content}</p>}
                {editCmt && <div className='flex justify-end space-x-2 mt-1 text-sm'>
                    <button className='bg-green-500 px-2 rounded-lg hover:bg-green-300' onClick={() => handleSubmit()}>Submit</button>
                    <button className='bg-red-500 px-2 rounded-lg hover:bg-red-300' onClick={() => handleCloseEdit()}>Cancel</button>
                </div>}
            </div>
            <div className='flex items-center text-sm space-x-3 p-1 font-semibold text-gray-600 dark:text-gray-200'>
                <button className="flex items-center space-x-1 hover:text-black">
                    {liked ? <AiFillLike /> : <AiOutlineLike />}
                    <span>{totalLike}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-black" onClick={() => setOpenRep(true)}>
                    <AiOutlineComment />
                    <span>{totalReplies}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-black" title='Edit comment' onClick={() => setEditCmt(true)}>
                    <AiOutlineEdit />
                </button>
            </div>
            {openRep && <Replies commentId={id} />}
        </div>
    </div>)
}

export default Comment