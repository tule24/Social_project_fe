import { cache } from '@/ApolloProvider'
import { FRIEND_FRAGMENT, GET_FRIEND_LIST, GET_NEW_FRIEND, GET_NOTIFICATION, POST_FRAGMENT, USER_LIKE_FRAGMENT } from '@/graphql'

export const notificationService = (data) => {
    if (data.option !== 'unfriend' && data.option !== 'unlikepost') {
        updateNoti(data)
    }
    if (data.option.includes('friend')) {
        if (data.option === 'addfriend') {
            handleAddFriend(data)
        } else if (data.option === 'confirmfriend') {
            handleConfirmFriend(data)
        } else if (data.option === 'unfriend') {
            handleUnfriend(data)
        }
    }
    if (data.option.includes('post')) {
        if (data.option === 'likepost') {
            handleLikePost(data)
        } else if (data.option === 'unlikepost') {
            handleUnlikePost(data)
        }
    }
}

const updateNoti = (data) => {
    const notiCache = cache.readQuery({ query: GET_NOTIFICATION, variables: { page: 1 } })
    if (notiCache) {
        cache.writeQuery({ query: GET_NOTIFICATION, variables: { page: 1 }, data: { getNotification: [data, ...notiCache.getNotification] } })
    }
}

const handleUnfriend = (data) => {
    const friendListCache = cache.readQuery({ query: GET_FRIEND_LIST })
    if (friendListCache) {
        cache.writeQuery({
            query: GET_FRIEND_LIST,
            data: {
                friendOfUser: friendListCache.friendOfUser.filter(el => el.id !== data.contentId)
            }
        })
    }

    const friendNewCache = cache.readQuery({ query: GET_NEW_FRIEND })
    if (friendNewCache) {
        cache.writeQuery({
            query: GET_NEW_FRIEND,
            data: {
                users: [...friendNewCache.users, { id: data.contentId, name: data.from.name, ava: data.from.ava }]
            }
        })
    }
}

const handleConfirmFriend = (data) => {
    const { contentId } = data
    let friendUpdate = cache.readFragment({
        id: `Friend:${contentId}`,
        fragment: FRIEND_FRAGMENT
    })

    if (friendUpdate) {
        const status = 'confirm'
        cache.writeFragment({
            id: `Friend:${contentId}`,
            fragment: FRIEND_FRAGMENT,
            data: { ...friendUpdate, status }
        })
    }
}

const handleAddFriend = (data) => {
    const friendNewCache = cache.readQuery({ query: GET_NEW_FRIEND })
    if (friendNewCache) {
        cache.writeQuery({
            query: GET_NEW_FRIEND,
            data: {
                users: friendNewCache.users.filter(el => el.id !== data.contentId)
            }
        })
    }
    const newFriend = {
        id: data.from.id,
        name: data.from.name,
        ava: data.from.ava,
        status: 'request'
    }
    const friendListCache = cache.readQuery({ query: GET_FRIEND_LIST })
    if (friendListCache) {
        cache.writeQuery({ query: GET_FRIEND_LIST, data: { friendOfUser: [...friendListCache.friendOfUser, newFriend] } })
    }
}

const handleLikePost = (data) => {
    const { contentId } = data
    const postUpdate = cache.readFragment({ id: `Post:${contentId}`, fragment: POST_FRAGMENT })
    if (postUpdate) {
        const totalLike = postUpdate.totalLike + 1
        cache.writeFragment({ id: `Post:${contentId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalLike } })
    }

    const userLikeUpdate = cache.readFragment({ id: `Post:${contentId}`, fragment: USER_LIKE_FRAGMENT })
    if (userLikeUpdate) {
        const newUserLike = [...userLikeUpdate.userLike, { id: data.from.id, name: data.from.name, ava: data.from.ava }]
        cache.writeFragment({ id: `Post:${contentId}`, fragment: USER_LIKE_FRAGMENT, data: { ...userLikeUpdate, userLike: [...newUserLike] } })
    }
}

const handleUnlikePost = (data) => {
    const { contentId } = data
    const postUpdate = cache.readFragment({ id: `Post:${contentId}`, fragment: POST_FRAGMENT })
    if (postUpdate) {
        const totalLike = postUpdate.totalLike - 1
        cache.writeFragment({ id: `Post:${contentId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalLike } })
    }

    const userLikeUpdate = cache.readFragment({ id: `Post:${contentId}`, fragment: USER_LIKE_FRAGMENT })
    if (userLikeUpdate) {
        const newUserLike = userLikeUpdate.userLike.filter(el => el.id !== data.from.id)
        cache.writeFragment({ id: `Post:${contentId}`, fragment: USER_LIKE_FRAGMENT, data: { ...userLikeUpdate, userLike: [...newUserLike] } })
    }
}
