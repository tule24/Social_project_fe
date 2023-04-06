import { cache } from '@/ApolloProvider'
import { POST_FOR_USER, POST_OF_OWNER, POST_FRAGMENT, USER_LIKE_FRAGMENT } from '@/graphql'
import { toast } from 'react-toastify'
export const createPostService = (postInput, modal, setModal) => {
    return {
        variables: {
            postInput
        },
        update: (cache, { data }) => {
            const postOfOwnerCache = cache.readQuery({ query: POST_OF_OWNER, variables: { page: 1 } })
            if (postOfOwnerCache) {
                cache.writeQuery({ query: POST_OF_OWNER, variables: { page: 1 }, data: { postOfOwner: [{ ...data.createPost, liked: false }, ...postOfOwnerCache.postOfOwner] } })
            }

            if (data.createPost.vision !== 'private') {
                const postForOwnerCache = cache.readQuery({ query: POST_FOR_USER, variables: { page: 1 } })
                if (postForOwnerCache) {
                    cache.writeQuery({ query: POST_FOR_USER, variables: { page: 1 }, data: { postForUser: [{ ...data.createPost, liked: false }, ...postForOwnerCache.postForUser] } })
                }
            }
        },
        onCompleted: () => {
            toast.success('Create new post success')
            setModal({ ...modal, open: false })
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
            setModal({ ...modal, open: false })
        }
    }
}

export const updatePostService = (postId, postInput, modal, setModal) => {
    return {
        variables: {
            postId,
            postInput
        },
        update: (cache, { data }) => {
            const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
            const { content, media, vision, updatedAt } = data.updatePost
            if (postUpdate) {
                cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, content, media, vision, updatedAt } })
            }

            const postOfOwnerCache = cache.readQuery({ query: POST_OF_OWNER, variables: { page: 1 } })
            if (postOfOwnerCache) {
                const sortPostOfOwner = [...postOfOwnerCache.postOfOwner]
                sortPostOfOwner.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                cache.writeQuery({ query: POST_OF_OWNER, variables: { page: 1 }, data: { postOfOwner: [...sortPostOfOwner] } })
            }
        },
        onCompleted: () => {
            toast.success('Update post success')
            setModal({ ...modal, open: false })
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
            setModal({ ...modal, open: false })
        }
    }
}

export const deletePostService = (postId, modal, setModal) => {
    return {
        variables: {
            postId
        },
        update: (cache, { data }) => {
            const postOfOwnerCache = cache.readQuery({ query: POST_OF_OWNER, variables: { page: 1 } })
            if (postOfOwnerCache) {
                cache.writeQuery({ query: POST_OF_OWNER, variables: { page: 1 }, data: { postOfOwner: postOfOwnerCache.postOfOwner.filter(el => el.id !== data.deletePost.id) } })
            }

            const postForOwnerCache = cache.readQuery({ query: POST_FOR_USER, variables: { page: 1 } })
            if (postForOwnerCache) {
                cache.writeQuery({ query: POST_FOR_USER, variables: { page: 1 }, data: { postForUser: postForOwnerCache.postForUser.filter(el => el.id !== data.deletePost.id) } })
            }
        },
        onCompleted: () => {
            toast.success('Delete post success')
            setModal({ ...modal, open: false })
        },
        onError: (error) => {
            toast.error(error.message)
            setModal({ ...modal, open: false })
        }
    }
}

export const likePostService = (postId, setLiked, totalLike, setTotalLike, user) => {
    return {
        variables: {
            postId
        },
        update: (cache, { data }) => {
            const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
            if (postUpdate) {
                const totalLike = postUpdate.totalLike + 1
                cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalLike, liked: true } })
            }

            const userLikeUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: USER_LIKE_FRAGMENT })
            if (userLikeUpdate) {
                const newUserLike = [...userLikeUpdate.userLike, { id: user.id, name: user.name, ava: user.ava }]
                cache.writeFragment({ id: `Post:${postId}`, fragment: USER_LIKE_FRAGMENT, data: { ...userLikeUpdate, userLike: [...newUserLike] } })
            }
        },
        onError: (error) => {
            setLiked(false)
            setTotalLike(totalLike - 1)
        }
    }
}

export const unlikePostService = (postId, setLiked, totalLike, setTotalLike, user) => {
    return {
        variables: {
            postId
        },
        update: (cache, { data }) => {
            const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
            if (postUpdate) {
                const totalLike = postUpdate.totalLike - 1
                cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalLike, liked: false } })
            }

            const userLikeUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: USER_LIKE_FRAGMENT })
            if (userLikeUpdate) {
                const newUserLike = userLikeUpdate.userLike.filter(el => el.id !== user.id)
                cache.writeFragment({ id: `Post:${postId}`, fragment: USER_LIKE_FRAGMENT, data: { ...userLikeUpdate, userLike: [...newUserLike] } })
            }
        },
        onError: (error) => {
            setLiked(true)
            setTotalLike(totalLike + 1)
        }
    }
}

export const updateLikePost = (postId, totalLike) => {
    const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
    if (postUpdate) {
        cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalLike } })
    }
}