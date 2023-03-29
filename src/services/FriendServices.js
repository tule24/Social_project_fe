import { FRIEND_FRAGMENT, GET_FRIEND_LIST, GET_NEW_FRIEND } from '@/graphql'
import { toast } from 'react-toastify'

export const addFriendService = (friendId) => {
    return {
        variables: {
            friendId
        },
        update: (cache, { data }) => {
            const friendListCache = cache.readQuery({ query: GET_FRIEND_LIST })
            if (friendListCache) {
                cache.writeQuery({
                    query: GET_FRIEND_LIST,
                    data: {
                        friendOfUser: [...friendListCache.friendOfUser, data.addFriend]
                    }
                })
            }

            const friendNewCache = cache.readQuery({ query: GET_NEW_FRIEND })
            if (friendNewCache) {
                cache.writeQuery({
                    query: GET_NEW_FRIEND,
                    data: {
                        users: friendNewCache.users.filter(el => el.id !== data.addFriend.id)
                    }
                })
            }
        },
        onCompleted: () => {
            toast.success('Add friend success')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }
}

export const confirmFriendService = (friendId) => {
    return {
        variables: {
            friendId
        },
        update: (cache, { data }) => {
            let friendUpdate = cache.readFragment({
                id: `Friend:${friendId}`,
                fragment: FRIEND_FRAGMENT
            })

            if (friendUpdate) {
                const { status } = data.confirmFriend
                cache.writeFragment({
                    id: `Friend:${friendId}`,
                    fragment: FRIEND_FRAGMENT,
                    data: { ...friendUpdate, status }
                })
            }
        },
        onCompleted: () => {
            toast.success('Confirm friend success')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }
}

export const unFriendService = (friendId) => {
    return {
        variables: {
            friendId
        },
        update: (cache, { data }) => {
            const friendListCache = cache.readQuery({ query: GET_FRIEND_LIST })
            if (friendListCache) {
                cache.writeQuery({
                    query: GET_FRIEND_LIST,
                    data: {
                        friendOfUser: friendListCache.friendOfUser.filter(el => el.id !== data.unFriend.id)
                    }
                })
            }

            const friendNewCache = cache.readQuery({ query: GET_NEW_FRIEND })
            if (friendNewCache) {
                cache.writeQuery({
                    query: GET_NEW_FRIEND,
                    data: {
                        users: [...friendNewCache.users, data.unFriend]
                    }
                })
            }
        },
        onCompleted: () => {
            toast.success('Unfriend friend success')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }
}