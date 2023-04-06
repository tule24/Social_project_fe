import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail, HiFingerPrint, HiStar } from 'react-icons/hi'
import { useMutation } from '@apollo/client'
import { LOGIN } from '@/graphql'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styles from '@/styles/Form.module.css'
import { MyTextInput } from '@/components'
import { loginService } from '@/services'
import { FiLoader } from 'react-icons/fi'

function Login() {
    const [show, setShow] = useState(false)
    const [login, { data, loading, error }] = useMutation(LOGIN)

    const handleLogin = (values) => {
        login(loginService(values))
    }
    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-5xl font-extrabold py-4 tracking-wide'>Login</h1>
            </div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required('Required')
                        .email('Invalid email'),
                    password: Yup.string()
                        .required('Required')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    handleLogin(values)
                }}
            >
                <Form className='flex flex-col gap-3' >
                    <MyTextInput
                        placeholder='Email'
                        name="email"
                        type="text"
                        IconComp={<span className='icon flex items-center px-4 '>
                            <HiOutlineMail size={25} className='text-gray-300' />
                        </span>}
                    />
                    <MyTextInput
                        placeholder='Password'
                        name="password"
                        type={`${show ? "text" : "password"}`}
                        IconComp={<span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25} className='text-gray-300 hover:text-blue-400' />
                        </span>}
                    />
                    <div className="input-button">
                        <button type='submit' className={styles.button}>
                            {loading ? <FiLoader className='animate-spin mx-auto' size={20} /> : 'Login'}
                        </button>
                    </div>
                </Form>
            </Formik>
            <div className='text-center text-gray-400 text-sm lg:text-base'>
                <p>
                    Don't have an account yet? <Link to={'/register'}><span className='text-blue-700'>Sign Up</span></Link>
                </p>
                <p>or</p>
                <p>Login by test account</p>
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-2 pt-2'>
                    <button
                        className='btn-login relative'
                        onClick={() => handleLogin({ email: 'peter@gmail.com', password: '123456' })}
                    >Peter <HiStar className='absolute top-0 right-0 text-orange-300' /></button>
                    <button
                        className='btn-login relative'
                        onClick={() => handleLogin({ email: 'anna@gmail.com', password: '123456' })}
                    >Anna <HiStar className='absolute top-0 right-0 text-orange-300' /></button>
                    <button
                        className='btn-login'
                        onClick={() => handleLogin({ email: 'will@gmail.com', password: '123456' })}
                    >Will</button>
                    <button
                        className='btn-login'
                        onClick={() => handleLogin({ email: 'angela@gmail.com', password: '123456' })}
                    >Angela</button>
                    <button
                        className='btn-login'
                        onClick={() => handleLogin({ email: 'christine@gmail.com', password: '123456' })}
                    >Christine</button>
                    <button
                        className='btn-login'
                        onClick={() => handleLogin({ email: 'john@gmail.com', password: '123456' })}
                    >John</button>
                    <button
                        className='btn-login'>John</button>
                    <button
                        className='btn-login'>John</button>
                </div>
            </div>

        </section>
    )
}

export default Login