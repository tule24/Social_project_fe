import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('socialAccessToken')) {
            navigate('/login')
        }
    }, [])
    return (
        <Outlet />
    )
}

export default ProtectedRoute