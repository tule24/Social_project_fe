import { AuthLayout, HomeLayout } from '@/layouts'
import { createBrowserRouter } from 'react-router-dom'
import { Login, Register } from '@/components'
import { Home, Friend } from '@/pages'
import ProtectedRoute from './protectedRoute'

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        // element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
                children: [
                    {
                        path: '',
                        element: <Home />
                    },
                    {
                        path: 'friend',
                        element: <Friend />
                    }
                ]
            }
        ]
    }
])