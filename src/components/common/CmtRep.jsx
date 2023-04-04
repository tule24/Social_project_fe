import React, { useContext, useEffect, useRef, useState } from 'react'
import { Replies, UserLike } from '@/components'
import { BsClockHistory } from 'react-icons/bs'
import { AiFillLike, AiOutlineComment, AiOutlineDelete, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai'
import { FiLoader } from 'react-icons/fi'
import { SocialContext } from '@/context'
import { USER_LIKE_COMMENT, USER_LIKE_REPLIES } from '@/graphql'

function CmtRep({ parentId, obj, opt, updateFunc, updateSer, deleteFunc, deleteSer, likeFunc, likeSer, unlikeFunc, unlikeSer }) {
    const { userInfo } = useContext(SocialContext)
    const [openConfirm, setOpenConfirm] = useState(false)
    const { id, creator, content, createdAt, totalReplies } = obj
    const textRef = useRef(null)
    const [loading, setLoading] = useState('')
    const [text, setText] = useState(content)
    const [editText, setEditText] = useState(false)
    const [showLike, setShowLike] = useState(false)

    const resizeTextArea = () => {
        textRef.current.style.height = "auto";
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }

    useEffect(() => {
        editText && resizeTextArea()
    }, [text])
    useEffect(() => {
        if (editText) {
            const len = content.length
            textRef.current.setSelectionRange(len, len)
        }
    }, [editText])

    const handleSubmitEdit = () => {
        setLoading('edit')
        if (opt === 'comment') {
            updateFunc(updateSer(id, text, setLoading, setEditText))
        } else {
            updateFunc(updateSer(parentId, id, text, setLoading, setEditText))
        }
    }
    const handleDelete = () => {
        setLoading('delete')
        setOpenConfirm(false)
        deleteFunc(deleteSer(parentId, id, setLoading))
    }
    const handleCancelEdit = () => {
        setEditText(false)
        setText(content)
    }

    const [liked, setLiked] = useState(obj.liked)
    const [totalLike, setTotalLike] = useState(obj.totalLike)
    const handleLikePost = () => {
        setLiked(!liked)
        if (liked) {
            setTotalLike(totalLike - 1)
            opt === 'comment'
                ? unlikeFunc(unlikeSer(id, setLiked, totalLike, setTotalLike))
                : unlikeFunc(unlikeSer(parentId, id, setLiked, totalLike, setTotalLike))
        } else {
            setTotalLike(totalLike + 1)
            opt === 'comment'
                ? likeFunc(likeSer(id, setLiked, totalLike, setTotalLike))
                : likeFunc(likeSer(parentId, id, setLiked, totalLike, setTotalLike))
        }
    }

    const [openRep, setOpenRep] = useState(false)
    return (
        <div className={opt === 'comment' ? 'cmt-parent' : 'rep-parent'} key={id}>
            <div className={opt === 'comment' ? 'cmt-track' : 'rep-track'} />
            <img src={creator.ava} alt="ava" className={opt === 'comment' ? 'cmt-ava' : 'rep-ava'} />
            <div className='w-full'>
                <div className={opt === 'comment' ? 'cmt-content' : 'rep-content'}>
                    <p className='font-semibold capitalize flex items-center'>{creator.name} <BsClockHistory title={createdAt} className='ml-2' size={10} /></p>
                    {editText
                        ? <textarea
                            ref={textRef}
                            className={opt === 'comment' ? 'cmt-area' : 'rep-area'}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{}}
                            autoFocus />
                        : <p>{content}</p>}
                    {editText && <div className='flex justify-end space-x-2 mt-1 text-sm'>
                        <button className='bg-green-500 px-2 rounded-lg hover:bg-green-300' onClick={() => handleSubmitEdit()} disabled={loading === 'edit'}>{loading === 'edit' ? <FiLoader className='animate-spin' /> : 'Submit'}</button>
                        <button className='bg-red-500 px-2 rounded-lg hover:bg-red-300' onClick={() => handleCancelEdit()}>Cancel</button>
                    </div>}
                </div>
                <div className='flex items-center text-sm space-x-3 relative'>
                    <div className="cmt-rep-btn relative" >
                        <button onClick={() => handleLikePost()}>{liked ? <AiFillLike /> : <AiOutlineLike />}</button>
                        {totalLike > 0
                            ? <span className='hover:underline hover:text-blue-600 cursor-pointer' onClick={() => setShowLike(true)}>{totalLike}</span>
                            : <span>{totalLike}</span>
                        }
                        {showLike && <UserLike
                            query={opt === 'comment' ? USER_LIKE_COMMENT : USER_LIKE_REPLIES}
                            args={opt === 'comment' ? { commentId: id } : { commentId: parentId, repliesId: id }}
                            opt={opt}
                            setShowLike={setShowLike}
                        />}
                    </div>
                    {totalReplies !== undefined && (
                        <button className="cmt-rep-btn" onClick={() => setOpenRep(!openRep)}>
                            <AiOutlineComment />
                            <span>{totalReplies}</span>
                        </button>
                    )}
                    {creator.id === userInfo.id && <button className="cmt-rep-btn" title='Edit' onClick={() => setEditText(true)}>
                        <AiOutlineEdit />
                    </button>}
                    <button className="cmt-rep-btn" title='Delete' onClick={() => setOpenConfirm(true)} disabled={loading === 'delete'}>
                        {loading === 'delete' ? <FiLoader className='animate-spin' /> : <AiOutlineDelete />}
                    </button>
                    {
                        openConfirm && <div className={opt === 'comment' ? 'cmt-confirm' : 'rep-confirm'}>
                            <p className='w-[5rem] text-[10px]'>Are you sure to delete this?</p>
                            <div className='flex flex-col space-y-2 text-[10px]'>
                                <button className='bg-green-500 px-1 rounded-lg leading-snug hover:bg-green-300' onClick={() => handleDelete()} >Yes</button>
                                <button className='bg-red-500 px-1 rounded-lg leading-snug hover:bg-red-300' onClick={() => setOpenConfirm(false)}>No</button>
                            </div>
                            <div className='absolute bg-black w-2 h-2 translate-y-1 rotate-45 bottom-0 right-10'></div>
                        </div>
                    }
                </div>
                {openRep && <Replies commentId={id} totalReplies={totalReplies} />}
            </div>
        </div>
    )
}

export default CmtRep