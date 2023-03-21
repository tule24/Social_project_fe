import React from 'react'
import { HiOutlineUser, HiOutlinePhone, HiOutlineHome, HiOutlineMail } from 'react-icons/hi'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styles from '@/styles/Form.module.css'
import { MyTextInput } from '@/components'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function UpdateUser({ user, modal, setModal }) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return (
        <div className='w-full h-full flex items-center flex-col'>
            <div className='w-1/2 bg-slate-300 py-5 rounded-xl relative'>
                <button onClick={() => setModal({ ...modal, open: false })} className='absolute right-5 top-5'><AiOutlineCloseCircle size={30} /></button>
                <h1 className='text-center text-3xl font-semibold tracking-widest'>USER INFORMATION</h1>
                <div className='w-[70%] mx-auto mt-3'>
                    <Formik
                        initialValues={{
                            name: user.name,
                            dob: user.dob,
                            email: user.email,
                            phone: user.phone,
                            address: user.address
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string()
                                .required('Required')
                                .min(6, "Min length 6"),
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
                            console.log(values)
                        }}
                    >
                        <Form className='flex flex-col' >
                            <MyTextInput
                                label='User name'
                                placeholder='Username'
                                defaultValue={user.name}
                                name="name"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlineUser size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Email'
                                placeholder='Email'
                                defaultValue={user.email}
                                name="email"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlineMail size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Phone'
                                placeholder='Phone'
                                defaultValue={user.phone}
                                name="phone"
                                type="text"
                                IconComp={<span className='icon flex items-center px-4 bg-slate-50 border-l border-gray-200'>
                                    <HiOutlinePhone size={25} className='text-gray-700' />
                                </span>}
                            />
                            <MyTextInput
                                label='Address'
                                placeholder='Address'
                                defaultValue={user.address}
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
                            <div className="input-button mt-7">
                                <button type='submit' className={styles.button}>
                                    Update
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser