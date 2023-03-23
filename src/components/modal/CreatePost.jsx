import React, { useCallback, useEffect, useState } from 'react'
import { AiFillLike, AiOutlineCloseCircle, AiOutlineClose, AiOutlineComment, AiOutlineFileAdd } from 'react-icons/ai'
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
import { CREATE_POST, POST_OF_OWNER, POST_FOR_USER } from '@/graphql'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

function CreatePost({ user, modal, setModal }) {
  const [createPost, { loading, data, error }] = useMutation(CREATE_POST)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [vision, setVision] = useState('public')

  const removeImage = (fileName) => {
    const newFiles = files.filter(el => el.file.name !== fileName)
    setFiles([...newFiles])
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
      const media = await Promise.all(files.map(async (el) => await toBase64(el.file)))
      const post = {
        content,
        media,
        vision
      }
      createPost({
        variables: {
          postInput: post
        },
        refetchQueries: [{ query: POST_FOR_USER }, { query: POST_OF_OWNER }]
      })
    }
  }

  useEffect(() => {
    error && toast.error(error.message)
  }, [error])

  useEffect(() => {
    if (data) {
      toast.success('Create new post success')
      setModal({ ...modal, open: false })
    }
  }, [data])

  useEffect(() => {
    return () => files.forEach(el => URL.revokeObjectURL(el.url))
  }, [])

  return (
    <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden grid grid-cols-2'>
      <div className='bg-gray-300 p-5 overflow-auto'>
        <h1 className='text-center text-3xl font-semibold tracking-widest'>CREATE NEW POST</h1>
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
            <div className='flex flex-wrap space-x-2'>
              {files.map((el, i) => {
                return <div className='flex items-center space-x-1 p-1 rounded-lg bg-gray-100' key={i}>
                  <span>{el.file.name}</span>
                  <button onClick={() => removeImage(el.file.name)}><AiOutlineClose /></button>
                </div>
              })}
            </div>
          </div>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Vision</h1>
            <div className='flex justify-between '>
              <select
                className=" rounded-lg p-2 w-1/2"
                name='vision'
                onChange={(e) => setVision(e.target.value)}
                required
              >
                <option className='text-black font-semibold' value='public'>Public</option>
                <option className='text-black font-semibold' value='friend'>Friend</option>
                <option className='text-black font-semibold' value='private'>Private</option>
              </select>
              {loading
                ? <button disabled className='px-3 py-2 rounded-lg my-shadow bg-blue-500 font-semibold text-white flex items-center'>WAITING <FiLoader className='ml-2 animate-spin' size={20} /></button>
                : <button onClick={() => handleSubmit()} className='px-3 py-2 rounded-lg my-shadow bg-blue-500 font-semibold text-white flex items-center'>CREATE POST <AiOutlineFileAdd className='ml-2' size={20} /></button>
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
                <span className="text-xs dark:text-gray-400">Just now</span>
              </div>
            </div>
            <button onClick={() => setModal({ ...modal, open: false })}><AiOutlineCloseCircle size={30} /></button>
          </div>
          <div className='overflow-auto h-[82%]'>
            <div className='my-2 w-full break-words'>
              {parse(content)}
            </div>
            {files.length ? <Slider images={files.map(el => el.url)} /> : ""}
          </div>
          <div className="flex flex-wrap justify-between text-lg px-2 h-[10%] border-t border-gray-300">
            <div className="flex space-x-10 dark:text-gray-400">
              <button className="flex items-center space-x-2">
                <AiFillLike />
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

export default CreatePost