import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from '@/styles/AuthLayout.module.css'

function AuthLayout() {
    return (
        <div className='w-screen h-screen bg-blue-400 flex items-center justify-center'>
            <div className="bg-slate-50 rounded-md w-3/5 min-h-[75%] grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}></div>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
