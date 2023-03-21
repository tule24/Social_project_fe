import React, { createContext, useState } from 'react'
const sample = {
    userInfo: {
        address: "Ho Chi Minh City",
        ava: "https://i.pravatar.cc/?img=62",
        dob: "2/4/1997, 12:00:00 AM",
        email: "peter@gmail.com",
        id: "64177bdbb525c87703db7974",
        name: "peter",
        phone: "058456789"
    },
    friendList: {
        confirm: [
            { _id: '64177c29b525c87703db7977', name: 'anna', ava: 'https://i.pravatar.cc/?img=49', status: 'confirm', __typename: 'Friend' }
        ],
        waiting: [
            { _id: '64177c74b525c87703db797c', name: 'john', ava: 'https://i.pravatar.cc/?img=14', status: 'waiting', __typename: 'Friend' },
            { _id: '64177cb0b525c87703db797f', name: 'tiffany', ava: 'https://i.pravatar.cc/?img=10', status: 'waiting', __typename: 'Friend' },
            { _id: '64177cf4b525c87703db7982', name: 'will', ava: 'https://i.pravatar.cc/?img=33', status: 'waiting', __typename: 'Friend' },
            { _id: '64177d49b525c87703db7985', name: 'kevin', ava: 'https://i.pravatar.cc/?img=65', status: 'waiting', __typename: 'Friend' },
            { _id: '64177d8fb525c87703db7988', name: 'danny', ava: 'https://i.pravatar.cc/?img=54', status: 'waiting', __typename: 'Friend' },
            { _id: '64177dd1b525c87703db798b', name: 'christine', ava: 'https://i.pravatar.cc/?img=49', status: 'waiting', __typename: 'Friend' },
            { _id: '64177dfeb525c87703db798e', name: 'betty', ava: 'https://i.pravatar.cc/?img=40', status: 'waiting', __typename: 'Friend' },
            { _id: '64177e2bb525c87703db7991', name: 'angela', ava: 'https://i.pravatar.cc/?img=32', status: 'waiting', __typename: 'Friend' }
        ],
        request: []
    },
    messageRoom: [
        {
            id: "641782cba9234b0aa50e0001",
            users: [
                { id: '64177bdbb525c87703db7974', name: 'peter', ava: 'https://i.pravatar.cc/?img=62', __typename: 'User' },
                { id: '64177c29b525c87703db7977', name: 'anna', ava: 'https://i.pravatar.cc/?img=49', __typename: 'User' }
            ]
        }
    ]
}
export const SocialContext = createContext()
export const SocialProvider = (({ children }) => {
    const [userInfo, setUserInfo] = useState(sample.userInfo)
    const [friendList, setFriendList] = useState(sample.friendList)
    const [messageRoom, setMessageRoom] = useState(sample.messageRoom)
    const [miniChat, setMiniChat] = useState([])
    const [modal, setModal] = useState({
        open: false,
        component: ""
    })

    const handleLoginSuccess = (user) => {
        const { friendList, messageRoomOfUser, ...userInfo } = user
        console.log(friendList)
        console.log(messageRoomOfUser)
        console.log(userInfo)
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
                miniChat,
                setMiniChat,
                setModal,
                handleLoginSuccess
            }}>
            {children}
        </SocialContext.Provider>
    )
})