import { toast } from "react-toastify"
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const loginService = (loginInput) => {
    return {
        variables: {
            loginInput
        },
        onCompleted: (data) => {
            const { login } = data
            const { token, refreshToken } = login
            localStorage.setItem('accessToken', token)
            cookies.set("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
            })
            window.location.href = '/'
        },
        onError: () => {
            toast.error('Something wrong when login')
        }
    }
}
export const logoutService = (navigate) => {
    return {
        onCompleted: () => {
            localStorage.clear()
            cookies.remove('refreshToken')
            navigate('/login')
        }
    }
}