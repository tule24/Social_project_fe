import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineMail, HiFingerPrint } from 'react-icons/hi'
import { useMutation } from '@apollo/client'
import { LOGIN } from '@/graphql'
import { toast } from 'react-toastify'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { SocialContext } from '@/context'
import styles from '@/styles/Form.module.css'
import { MyTextInput } from '@/components'

function Login() {
    const { setUserInfo } = useContext(SocialContext)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [login, { data, loading, error }] = useMutation(LOGIN)

    useEffect(() => {
        error && toast.error(error.message)
    }, [error])

    useEffect(() => {
        if (data) {
            const { login } = data
            const { token, refreshToken, user } = login
            localStorage.setItem('accessToken', token)
            localStorage.setItem('refreshToken', refreshToken)
            setUserInfo(user)
            navigate('/')
        }
    }, [data])

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
                    login({
                        variables: {
                            loginInput: values
                        }
                    })
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
                            Login
                        </button>
                    </div>
                </Form>
            </Formik>
            <p className='text-center text-gray-400 '>
                Don't have an account yet? <Link to={'/register'}><span className='text-blue-700'>Sign Up</span></Link>
            </p>
        </section>
    )
}

export default Login