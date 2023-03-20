import React, { createContext, useState } from 'react'
import { CreatePost } from '@/components'
export const SocialContext = createContext()
export const SocialProvider = (({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [friendList, setFriendList] = useState({
        confirm: [],
        waiting: [],
        request: []
    })
    const [messageRoom, setMessageRoom] = useState([])
    const [modal, setModal] = useState({
        open: false,
        component: <CreatePost />
    })

    const handleLoginSuccess = (user) => {
        const { friendList, messageRoomOfUser, ...userInfo } = user
        const confirm = []
        const waiting = []
        const request = []
        friendList.forEach(el => {
            if (el.status === 'confirm') {
                confirm.push(el)
            } else if (el.status === 'waiting') {
                waiting.push(el)
            } else {
                request.push(el)
            }
        })
        const formatMsgRoom = messageRoomOfUser.map(el => {
            const user = el.users.filter(u => u.id !== userInfo.id)
            return {
                id: el.id,
                user,
                message: []
            }
        })

        setUserInfo({ ...userInfo })
        setFriendList({ confirm: [...confirm], waiting: [...waiting], request: [...request] })
        setMessageRoom([...formatMsgRoom])
    }

    return (
        <SocialContext.Provider
            value={{
                userInfo,
                friendList,
                messageRoom,
                modal,
                setModal,
                handleLoginSuccess
            }}>
            {children}
        </SocialContext.Provider>
    )
})