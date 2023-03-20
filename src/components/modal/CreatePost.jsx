import React, { useCallback, useEffect, useState } from 'react'
import { AiFillLike, AiOutlineCloseCircle, AiOutlineComment, AiOutlineFileAdd } from 'react-icons/ai'
import { GiEarthAmerica } from 'react-icons/gi'
import { FaUsers, FaUserLock } from 'react-icons/fa'
import uploadImg from '@/assets/upload.png'
import { Slider } from '@/components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import { useDropzone } from 'react-dropzone'

const images = [
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
  'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
  'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80'
]
function CreatePost() {
  const [value, setValue] = useState('')
  const [fileURL, setFileURL] = useState([])
  const [url, setURL] = useState([])
  const [vision, setVision] = useState('public')

  const onDrop = useCallback(async (acceptedFile) => {
    setFileURL([...fileURL, acceptedFile[0]])
    const newURL = URL.createObjectURL(acceptedFile[0])
    setURL([...url, newURL])
  })
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    }
  })

  useEffect(() => {
    return () => url.forEach(el => URL.revokeObjectURL(el))
  }, [])

  return (
    <div className='w-full h-full bg-gray-200 rounded-lg overflow-hidden grid grid-cols-2'>
      <div className='bg-gray-300 p-5 overflow-auto'>
        <h1 className='text-center text-3xl font-semibold tracking-widest'>CREATE NEW POST</h1>
        <div className='mt-10 space-y-5'>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Content <span className='text-sm'>(required)</span></h1>
            <ReactQuill theme='snow' value={value} onChange={setValue} className='bg-white rounded-lg' placeholder='Input your content...' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>Media</h1>
            <div {...getRootProps()}>
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
              <button className='px-3 py-2 rounded-lg my-shadow bg-blue-500 font-semibold text-white flex items-center'>CREATE POST <AiOutlineFileAdd className='ml-2' size={20} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 overflow-auto border-l-2 border-gray-300'>
        <div className="flex flex-col w-full h-full p-6 space-y-5 rounded-lg dark:bg-zinc-800 dark:text-gray-100 overflow-auto">
          <div className='flex justify-between items-start h-[10%]'>
            <div className="flex space-x-4">
              <img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
              <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">Leroy Jenkins</a>
                <span className="text-xs dark:text-gray-400">Just now</span>
              </div>
            </div>
            <button onClick={() => setModal({ ...modal, open: false })}><AiOutlineCloseCircle size={30} /></button>
          </div>
          <div className='overflow-auto h-[80%]'>
            {parse(value)}
            {url.length ? <Slider images={url} /> : ""}
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