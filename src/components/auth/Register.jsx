import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import styles from '@/styles/Form.module.css'
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { registerValidate } from '@/helpers/validate'
import { useMutation } from '@apollo/client'
import { REGISTER } from '@/graphql'
import { toast } from 'react-toastify'

function Register() {
    const [show, setShow] = useState({ password: false, cpassword: false })
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit: async (values) => {
            register({
                variables: {
                    registerInput: values
                }
            })
        }
    })

    const [register, { data, loading, error }] = useMutation(REGISTER)

    useEffect(() => {
        error && toast.error(error.message)
    }, [error])

    useEffect(() => {
        if (data) {
            const { login } = data
            if (login?.__typename === 'MsgResponse') {
                toast.error(login.message)
            } else {
                navigate('/login')
            }
        }
    }, [data])

    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-5xl font-bold py-4'>Register</h1>
            </div>
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <input
                        type="text"
                        name='Username'
                        placeholder='Username'
                        className={styles.input_text}
                        {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>}
                <div className={styles.input_group}>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        className={styles.input_text}
                        {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>}
                <div className={styles.input_group}>
                    <input
                        type={`${show.password ? "text" : "password"}`}
                        name='password'
                        placeholder='Password'
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                <div className={styles.input_group}>
                    <input
                        type={`${show.cpassword ? "text" : "password"}`}
                        name='cpassword'
                        placeholder='Confirm Password'
                        className={styles.input_text}
                        {...formik.getFieldProps('cpassword')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Register
                    </button>
                </div>
            </form>
            <p className='text-center text-gray-400 '>
                Have an account? <Link to={'/login'}><span className='text-blue-700'>Sign In</span></Link>
            </p>
        </section>
    )
}

export default Register