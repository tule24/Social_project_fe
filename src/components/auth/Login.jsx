import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import styles from '@/styles/Form.module.css'
import { login_validate } from '@/helpers/validate'

function Login() {
    const [show, setShow] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: login_validate,
        onSubmit
    })

    async function onSubmit(values) {
        console.log(values)
    }

    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-5xl font-extrabold py-4 tracking-wide'>Login</h1>
            </div>
            <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
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
                        type={`${show ? "text" : "password"}`}
                        name='password'
                        placeholder='Password'
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
            </form>
            <p className='text-center text-gray-400 '>
                Don't have an account yet? <Link to={'/register'}><span className='text-blue-700'>Sign Up</span></Link>
            </p>
        </section>
    )
}

export default Login