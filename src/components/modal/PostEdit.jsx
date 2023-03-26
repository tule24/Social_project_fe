import React, { useCallback, useEffect, useState } from 'react'
import { AiFillLike, AiOutlineLike, AiOutlineCloseCircle, AiOutlineClose, AiOutlineComment, AiOutlineFileAdd, AiOutlineDelete } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import { FiLoader } from 'react-icons/fi'
import { FaUsers, FaUserLock } from 'react-icons/fa'
import uploadImg from '@/assets/upload.png'
import { Slider } from '@/components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import { useDropzone } from 'react-dropzone'
import { toBase64 } from '@/helper'
import { createPostService, updatePostService, deletePostService } from '@/services'

function PostEdit({ user, modal, setModal, post, createPost, updatePost, deletePost }) {
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [media, setMedia] = useState([])
  const [vision, setVision] = useState('public')

  const removeImage = (fileName) => {
    const newFiles = files.filter(el => el.file.name !== fileName)
    setFiles([...newFiles])
  }
  const removeMedia = (image) => {
    const newMedia = media.filter(el => el !== image)
    setMedia([...newMedia])
  }
  const onDrop = useCallback(async (acceptedFile) => {
    const newURL = URL.createObjectURL(acceptedFile[0])
    setFiles([...files, { file: acceptedFile[0], url: newURL }])
  })
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    }
  })

  const handleSubmit = async () => {
    if (content.trim() === '') {
      alert('Please type something in content')
    } else {
      setLoadingCreate(true)
      const fileToMedia = await Promise.all(files.map(async (el) => await toBase64(el.file)))
      const newMedia = [...media, ...fileToMedia]
      const newPost = {
        content,
        media: newMedia,
        vision
      }
      if (post) {
        updatePost(updatePostService(post.id, newPost, modal, setModal))
      } else {
        createPost(createPostService(newPost, modal, setModal))
      }
    }
  }
  const handleDelete = async () => {
    setLoadingDel(true)
    deletePost(deletePostService(post.id, modal, setModal))
  }

  useEffect(() => {
    return () => files.forEach(el => URL.revokeObjectURL(el.url))
  }, [])
  useEffect(() => {
    if (post) {
      setContent(post.content)
      setMedia([...post.media])
      setVision(post.vision)
    }
  }, [])

  return (
    <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden grid grid-cols-2'>
      <div className='bg-gray-300 p-5 overflow-auto'>
        <h1 className='text-center text-3xl font-semibold tracking-widest'>{post ? 'UPDATE POST' : 'CREATE NEW POST'}</h1>
        <div className='mt-10 space-y-5'>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Content <span className='text-sm'>(required)</span></h1>
            <ReactQuill theme='snow' value={content} onChange={setContent} className='bg-white rounded-lg' placeholder='Input your content...' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Media</h1>
            <div {...getRootProps()} className='cursor-pointer'>
              <input {...getInputProps()} />
              <div className='w-full flex flex-col items-center justify-center space-y-2 py-5 rounded-lg border-2 border-dashed border-gray-400'>
                <p>JPG, PNG, WEBM, MAX 100MB</p>
                <div>
                  <img src={uploadImg} alt="upload" className='w-[5rem]' />
                </div>
                <p>Drag & drop file</p>
                <p>or Browse media on your device</p>
              </div>
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {files.map((el, i) => {
                return <div className='bg-gray-100 rounded-lg overflow-hidden'>
                  <div className='flex items-center justify-end p-1' key={i}>
                    <button onClick={() => removeImage(el.file.name)}><AiOutlineClose /></button>
                  </div>
                  <img src={el.url} alt="ava" className='w-full h-full' />
                </div>
              })}
              {media.map((el, i) => {
                return <div className='bg-gray-100 rounded-lg overflow-hidden'>
                  <div className='flex items-center justify-end p-1' key={`media-${i}`}>
                    <button onClick={() => removeMedia(el)}><AiOutlineClose /></button>
                  </div>
                  <img src={el} alt="ava" className='w-full h-full' />
                </div>
              })}
            </div>
          </div>
          <div>
            <h1 className='text-xl font-semibold'>Vision</h1>
            <div className='my-2'>
              <select
                className=" rounded-lg p-2 w-1/2"
                value={vision}
                name='vision'
                onChange={(e) => setVision(e.target.value)}
                required
              >
                <option className='text-black font-semibold' value='public'>Public</option>
                <option className='text-black font-semibold' value='friend'>Friend</option>
                <option className='text-black font-semibold' value='private'>Private</option>
              </select>
            </div>
            <div className='flex space-x-5 mt-5 justify-end relative'>
              {post && (
                loadingDel
                  ? <button disabled className='px-3 py-2 rounded-lg my-shadow bg-red-500 font-semibold text-white flex items-center'>WAITING <FiLoader className='ml-2 animate-spin' size={20} /></button>
                  : <button onClick={() => setOpenConfirm(true)} className='px-3 py-2 rounded-lg my-shadow bg-red-500 font-semibold text-white flex items-center'>
                    DELETE POST <AiOutlineDelete className='ml-2' size={20} />
                  </button>
              )}
              {
                openConfirm && <div className='absolute bg-black text-white w-[10rem] space-y-1 rounded-lg text-sm p-2 top-[-5.5rem] right-[10rem] transition-all duration-200'>
                  <p>Are you sure to delete this post ?</p>
                  <div className='flex justify-end space-x-2'>
                    <button className='bg-green-500 px-2 rounded-lg hover:bg-green-300' onClick={() => handleDelete()} >Yes</button>
                    <button className='bg-red-500 px-2 rounded-lg hover:bg-red-300' onClick={() => setOpenConfirm(false)}>No</button>
                  </div>
                  <div className='absolute bg-black w-2 h-2 translate-y-1 rotate-45 bottom-0 right-10'></div>
                </div>
              }
              {loadingCreate
                ? <button disabled className='px-3 py-2 rounded-lg my-shadow bg-blue-500 font-semibold text-white flex items-center'>WAITING <FiLoader className='ml-2 animate-spin' size={20} /></button>
                : <button onClick={() => handleSubmit()} className='px-3 py-2 rounded-lg my-shadow bg-blue-500 font-semibold text-white flex items-center'>{post ? 'UPDATE' : 'CREATE'} POST <AiOutlineFileAdd className='ml-2' size={20} /></button>
              }
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 overflow-auto border-l-2 border-gray-300'>
        <div className="flex flex-col w-full h-full p-6 space-y-5 rounded-lg dark:bg-zinc-800 dark:text-gray-100 overflow-auto">
          <div className='flex justify-between items-start h-[8%]'>
            <div className="flex space-x-4">
              <img alt="" src={user.ava} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-semibold capitalize">{user.name}</span>
                <span className="text-xs dark:text-gray-400">{post ? post.createdAt : 'Just now'}</span>
              </div>
            </div>
            <button onClick={() => setModal({ ...modal, open: false })}><AiOutlineCloseCircle size={30} /></button>
          </div>
          <div className='overflow-auto h-[82%]'>
            <div className='my-2 w-full break-words'>
              {parse(content)}
            </div>
            {files.concat(media).length > 0 ? <Slider images={files.concat(media).map(el => el.url ? el.url : el)} /> : ""}
          </div>
          <div className="flex flex-wrap justify-between text-lg px-2 h-[10%] border-t border-gray-300">
            <div className="flex space-x-10 dark:text-gray-400">
              <button className="flex items-center space-x-2">
                {post ? (post.liked ? <AiFillLike /> : <AiOutlineLike />) : <AiOutlineLike />}
                <span>0</span>
              </button>
              <button className="flex items-center space-x-2">
                <AiOutlineComment />
                <span>0</span>
              </button>
            </div>
            <div className="flex space-x-2 dark:text-gray-400">
              <button type="button" className="flex items-center space-x-1.5">
                {vision === 'public' ? <GiEarthAmerica /> : (vision === 'friend' ? <FaUsers /> : <FaUserLock />)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEdit