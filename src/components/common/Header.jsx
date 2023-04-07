import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiSocialblade } from 'react-icons/si'
import { BsBellFill, BsPencilSquare } from 'react-icons/bs'
import { MdFiberNew, MdLightMode, MdNightlight, MdLogout } from 'react-icons/md'
import { FaUserFriends, FaUser } from 'react-icons/fa'
import { TbRefresh } from 'react-icons/tb'
import { Tooltip, PostEdit, Notification } from '@/components'
import { SocialContext } from '@/context'
import { GET_OWNER_INFO, CREATE_POST, NOTIFICATION_SUBSCRIPTION, LOGOUT } from '@/graphql'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { notificationService, logoutService } from '@/services'
import { AiOutlineClose } from 'react-icons/ai'

function Header() {
    const { loading, error, data } = useQuery(GET_OWNER_INFO)
    const [logout] = useMutation(LOGOUT)
    const [createPost] = useMutation(CREATE_POST)
    const { setModal, modal, handleInit, userInfo, setIsRefetch } = useContext(SocialContext)
    const [theme, setTheme] = useState('')
    const [openNoti, setOpenNoti] = useState(false)
    const [isNewNoti, setIsNewNoti] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])
    useEffect(() => {
        if (data && data.user) {
            handleInit(data.user)
        }
    }, [data])
    const changeTheme = () => {
        setTheme(theme === "dark" ? "" : "dark")
    }

    const notiSub = useSubscription(NOTIFICATION_SUBSCRIPTION)
    useEffect(() => {
        const { data } = notiSub
        if (data && data.notificationCreated) {
            data.notificationCreated.option !== 'unfriend' && setIsNewNoti(true)
            notificationService(data.notificationCreated)
        }
    }, [notiSub.data])
    useEffect(() => {
        const { error } = notiSub
        if (error) {
            console.log(error)
        }
    }, [notiSub.error])
    const handleClickNoti = () => {
        setOpenNoti(!openNoti)
        setIsNewNoti(false)
    }
    const handleLogout = () => {
        logout(logoutService(navigate))
    }
    return (
        <header className="py-5 sm:px-10 px-5 bg-gray-100 dark:bg-zinc-800 dark:text-gray-100 shadow-md fixed w-screen z-40">
            <div className="container flex justify-between items-center mx-auto">
                <div className='flex items-center space-x-5'>
                    <Link to={'/'}>
                        <h1 className='flex items-center text-3xl font-extrabold'>Social <SiSocialblade className='ml-2' /></h1>
                    </Link>
                    <div className=' hidden lg:block'>
                        <label htmlFor="Search" className="hidden">Search</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-500 dark:text-gray-100">
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                                    </svg>
                                </button>
                            </span>
                            <input
                                type="search"
                                name="Search"
                                placeholder="Search..."
                                className="w-[12rem] rounded-md my-input" />
                        </div>
                    </div>
                </div>
                <div className="items-center flex-shrink-0 sm:flex space-x-3 relative hidden">
                    <Tooltip message={"Refetch"} position={"-left-3"}>
                        <button className="header-btn" onClick={() => setIsRefetch(true)}><TbRefresh /></button>
                    </Tooltip>
                    <Tooltip message={"Create Post"} position={"-left-5"}>
                        <button
                            className="header-btn"
                            onClick={() => setModal({
                                ...modal,
                                open: true,
                                component: <PostEdit
                                    user={userInfo}
                                    modal={modal}
                                    setModal={setModal}
                                    createPost={createPost}
                                />
                            })}>
                            <BsPencilSquare />
                        </button>
                    </Tooltip>
                    <Tooltip message={"Friends"} position={"-left-3"}>
                        <Link to={"/friend"} className="header-btn"><FaUserFriends /></Link>
                    </Tooltip>
                    <Tooltip message={"Theme"} position={"-left-3"}>
                        <button className="header-btn" onClick={changeTheme}>{theme === "dark" ? <MdNightlight /> : <MdLightMode />}</button>
                    </Tooltip>
                    <Tooltip message={"Notification"} position={"-left-3"}>
                        <button className="header-btn relative" onClick={() => handleClickNoti()}>
                            <BsBellFill />
                            {isNewNoti && <MdFiberNew className='text-red-500 absolute top-0 right-0 text-lg' />}
                        </button>
                    </Tooltip>
                    <Tooltip message={"Profile"} position={"-left-1"}>
                        <Link to={'/profile'}>{userInfo?.ava ? <img src={userInfo?.ava} alt="ava" className='w-10 h-10 rounded-full' /> : <FaUser />}</Link>
                    </Tooltip>
                    <Tooltip message={"Logout"} position={"-left-1"}>
                        <button className="header-btn relative" onClick={() => handleLogout()}>
                            <MdLogout />
                        </button>
                    </Tooltip>
                </div>
                <div className="sm:hidden flex items-center space-x-2">
                    <Link to={'/profile'}>{userInfo?.ava ? <img src={userInfo?.ava} alt="ava" className='w-7 rounded-full' /> : <FaUser />}</Link>
                    <button className="header-btn" onClick={() => setIsRefetch(true)}><TbRefresh /></button>
                    <button onClick={() => handleClickNoti()}>
                        <BsBellFill />
                        {isNewNoti && <MdFiberNew className='text-red-500 absolute top-0 right-0 text-lg' />}
                    </button>
                    <button onClick={() => setOpenMenu(!openMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div >
            {openMenu && <div className='menu'>
                <button onClick={() => setOpenMenu(false)} className='absolute right-2 top-0.5'><AiOutlineClose size={20} className='hover:text-gray-500 text-black' /></button>
                <h1 className='text-center font-semibold tracking-widest'>Menu</h1>
                <div className='border-t border-gray-500 mt-2'>
                    <div className='noti-item justify-between'
                        onClick={() => {
                            setModal({
                                ...modal,
                                open: true,
                                component: <PostEdit
                                    user={userInfo}
                                    modal={modal}
                                    setModal={setModal}
                                    createPost={createPost}
                                />
                            })
                            setOpenMenu(false)
                        }}>
                        <p>Create Post</p>
                        <BsPencilSquare />
                    </div>
                    <Link to={"/friend"} className='noti-item justify-between' onClick={() => setOpenMenu(false)}>
                        <p>Friends</p>
                        <FaUserFriends />
                    </Link>
                    <div className='noti-item justify-between' onClick={() => { changeTheme(); setOpenMenu(false) }}>
                        <p>Themes</p>
                        {theme === "dark" ? <MdNightlight /> : <MdLightMode />}
                    </div>
                    <div className='noti-item justify-between' onClick={() => handleLogout()}>
                        <p>Log out</p>
                        <MdLogout />
                    </div>
                </div>
            </div>}
            {openNoti && <Notification setOpenNoti={setOpenNoti} modal={modal} setModal={setModal} user={userInfo} />}
        </header >
    )
}

export default Header