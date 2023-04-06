import React, { useEffect } from 'react'
import { HiOutlineUser, HiOutlinePhone, HiOutlineHome, HiOutlineMail } from 'react-icons/hi'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styles from '@/styles/Form.module.css'
import { MyTextInput } from '@/components'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '@/graphql'
import { FiLoader } from 'react-icons/fi'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

function UpdateUser({ user, modal, setModal }) {
    const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER)
    useEffect(() => {
        if (data) {
            setModal({ ...modal, open: false })
        }
    }, [data])
    return (
        <div className='w-full h-full'>
            <div className='w-[60%] mx-auto bg-gradient-to-r from-indigo-300 to-blue-300 py-5 rounded-xl relative my-shadow p-5'>
                <button onClick={() => setModal({ ...modal, open: false })} className='absolute right-5 top-5'><AiOutlineCloseCircle size={30} /></button>
                <h1 className='text-center text-3xl font-semibold tracking-widest'>USER INFORMATION</h1>
                <div className='mx-auto mt-[3rem]'>
                    <Formik
                        initialValues={{
                            name: user.name || '',
                            dob: user.dob || '',
                            email: user.email || '',
                            phone: user.phone || '',
                            address: user.address || ''
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .required('Required')
                                .min(3, "Min length 3"),
                            email: Yup.string()
                                .required('Required')
                                .email('Invalid email'),
                            phone: Yup.string()
                                .required('Required')
                                .matches(phoneRegExp, 'Phone number invalid'),
                            address: Yup.string()
                                .required('Required')
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                            updateUser({
                                variables: {
                                    userInput: values
                                }
                            })
                        }}
                    >
                        <Form className='grid grid-cols-2 gap-5' >
                            <MyTextInput
                                label='User name'
                                placeholder='Username'
                                name="name"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlineUser size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Email'
                                placeholder='Email'
                                name="email"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlineMail size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Phone'
                                placeholder='Phone'
                                name="phone"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlinePhone size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Address'
                                placeholder='Address'
                                name="address"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlineHome size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Birthday'
                                placeholder='DOB'
                                name='dob'
                                type="date"
                                IconComp=''
                            />
                            <div className="input-button col-span-2">
                                <button type='submit' className={styles.button}>
                                    {loading ? <FiLoader className='animate-spin mx-auto' size={20} /> : 'Update'}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}

export default UpdateUser