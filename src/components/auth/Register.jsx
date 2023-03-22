import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '@/styles/Form.module.css'
import { HiOutlineUser, HiOutlineMail, HiFingerPrint } from 'react-icons/hi'
import { useMutation } from '@apollo/client'
import { REGISTER } from '@/graphql'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { MyTextInput } from '@/components'

function Register() {
    const navigate = useNavigate()
    const [show, setShow] = useState({ password: false, cpassword: false })
    const [register, { data, loading, error }] = useMutation(REGISTER)

    useEffect(() => {
        error && toast.error(error.message)
    }, [error])

    useEffect(() => {
        if (data) {
            navigate('/login')
            toast.success('Register success. Login with new account')
        }
    }, [data])

    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-5xl font-bold py-4'>Register</h1>
            </div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    cpassword: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Required')
                        .min(6, "Min length 6"),
                    email: Yup.string()
                        .required('Required')
                        .email('Invalid email'),
                    password: Yup.string()
                        .required('Required')
                        .min(6, "Min length 6"),
                    cpassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords not match')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    delete values.cpassword
                    register({
                        variables: {
                            registerInput: values
                        }
                    })
                }}
            >
                <Form className='flex flex-col gap-3' >
                    <MyTextInput
                        placeholder='Username'
                        name="name"
                        type="text"
                        IconComp={<span className='icon flex items-center px-4'>
                            <HiOutlineUser size={25} />
                        </span>}
                    />
                    <MyTextInput
                        placeholder='Email'
                        name="email"
                        type="text"
                        IconComp={<span className='icon flex items-center px-4'>
                            <HiOutlineMail size={25} className='text-gray-300' />
                        </span>}
                    />
                    <MyTextInput
                        placeholder='Password'
                        name="password"
                        type={`${show.password ? "text" : "password"}`}
                        IconComp={<span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({ ...show, password: !show.password })}>
                            <HiFingerPrint size={25} className='text-gray-300 hover:text-blue-400' />
                        </span>}
                    />
                    <MyTextInput
                        placeholder='Confirm Password'
                        name="cpassword"
                        type={`${show.cpassword ? "text" : "password"}`}
                        IconComp={<span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                            <HiFingerPrint size={25} className='text-gray-300 hover:text-blue-400' />
                        </span>}
                    />
                    <div className="input-button">
                        <button type='submit' className={styles.button}>
                            Register
                        </button>
                    </div>
                </Form>
            </Formik>
            <p className='text-center text-gray-400 '>
                Have an account? <Link to={'/login'}><span className='text-blue-700'>Sign In</span></Link>
            </p>
        </section>
    )
}

export default Register