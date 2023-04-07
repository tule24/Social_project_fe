import React, { createContext, useState } from 'react'
export const SocialContext = createContext()
export const SocialProvider = (({ children }) => {
    const [userInfo, setUserInfo] = useState()
    const [messageRoom, setMessageRoom] = useState([])
    const [miniChat, setMiniChat] = useState([])
    const [isRefetch, setIsRefetch] = useState(false)
    const [modal, setModal] = useState({
        open: false,
        component: ""
    })
    const [loading, setLoading] = useState(true)

    const handleInit = (userData) => {
        const { messageRoomOfUser, ...userInfo } = userData
        const messageRoom = messageRoomOfUser.map(el => {
            const user = el.users.find(u => u.id !== userInfo.id)
            const { id, lastMessage, updatedAt } = el
            return {
                id,
                user,
                lastMessage,
                updatedAt,
                newMessage: false
            }
        })
        messageRoom.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        setUserInfo({ ...userInfo })
        setMessageRoom([...messageRoom])
    }

    return (
        <SocialContext.Provider
            value={{
                userInfo,
                modal,
                miniChat,
                messageRoom,
                loading,
                isRefetch,
                setIsRefetch,
                setLoading,
                setMessageRoom,
                setUserInfo,
                setModal,
                setMiniChat,
                handleInit
            }}>
            {children}
        </SocialContext.Provider>
    )
})