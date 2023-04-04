import React, { useCallback, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone'
import { toBase64 } from '@/helper'
import { FaImage } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'
import { UPDATE_USER } from '@/graphql'
import { useMutation } from '@apollo/client'

function UpdateAva({ user, modal, setModal }) {
    const [ava, setAva] = useState({ file: '', url: user.ava })
    const onDrop = useCallback(async (acceptedFile) => {
        const newURL = URL.createObjectURL(acceptedFile[0])
        setAva({ ...ava, file: acceptedFile[0], url: newURL })
    })
    const { getInputProps, getRootProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    })
    const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER)
    useEffect(() => {
        if (data) {
            setModal({ ...modal, open: false })
        }
    }, [data])
    const handleSubmit = async () => {
        const fileToMedia = await toBase64(ava.file)
        updateUser({
            variables: {
                userInput: {
                    ava: fileToMedia
                }
            }
        })
    }
    return (
        <div className='w-full h-full'>
            <div className='w-[60%] mx-auto bg-gradient-to-r from-indigo-300 to-blue-300 py-5 rounded-xl relative my-shadow p-5'>
                <button onClick={() => setModal({ ...modal, open: false })} className='absolute right-5 top-5'><AiOutlineCloseCircle size={30} /></button>
                <h1 className='text-center text-3xl font-semibold tracking-widest'>USER AVATAR</h1>
                <div className='grid grid-cols-2 mt-10'>
                    <div {...getRootProps()} className='cursor-pointer'>
                        <input {...getInputProps()} />
                        <div className='w-full flex flex-col items-center justify-center space-y-2 py-5 rounded-lg border-2 border-dashed border-white'>
                            <p>JPG, PNG, WEBM, MAX 100MB</p>
                            <div>
                                <FaImage size={80} className='text-white' />
                            </div>
                            <p>Drag & drop file</p>
                            <p>or Browse media on your device</p>
                        </div>
                    </div>
                    <div>
                        <img src={ava?.url} alt="ava" className="w-[60%] mx-auto rounded-full dark:bg-gray-500 aspect-square" loading='lazy' />
                    </div>
                </div>
                <div className='w-full mt-5 flex justify-center'>
                    <button type='submit' className='w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg' onClick={() => handleSubmit()}>
                        {false ? <FiLoader className='animate-spin mx-auto' size={20} /> : 'Update'}
                    </button>
                </div>
            </div>
        </div >
    )
}

export default UpdateAva