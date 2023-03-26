import { POST_FOR_USER, POST_OF_OWNER, POST_FRAGMENT } from '@/graphql'
import { toast } from 'react-toastify'
export const createPostService = (postInput, modal, setModal) => {
    return {
        variables: {
            postInput
        },
        update: (cache, { data }) => {
            const postOfOwnerCache = cache.readQuery({ query: POST_OF_OWNER, variables: { page: 1 } })
            const postForOwnerCache = cache.readQuery({ query: POST_FOR_USER, variables: { page: 1 } })

            cache.writeQuery({ query: POST_FOR_USER, variables: { page: 1 }, data: { postForUser: [{ ...data.createPost, liked: false }, ...postForOwnerCache.postForUser] } })
            cache.writeQuery({ query: POST_OF_OWNER, variables: { page: 1 }, data: { postOfUser: [{ ...data.createPost, liked: false }, ...postOfOwnerCache.postOfUser] } })
        },
        onCompleted: () => {
            toast.success('Create new post success')
            setModal({ ...modal, open: false })
        },
        onError: (error) => {
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
            const { content, media, vision } = data.updatePost
            cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, content, media, vision } })
        },
        onCompleted: () => {
            toast.success('Update post success')
            setModal({ ...modal, open: false })
        },
        onError: (error) => {
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
            const postForOwnerCache = cache.readQuery({ query: POST_FOR_USER, variables: { page: 1 } })

            const newPostOfOwnerCache = postOfOwnerCache.postOfUser.filter(el => el !== data.deletePost.id)
            const newPostForOwnerCache = postForOwnerCache.postForUser.filter(el => el !== data.deletePost.id)

            cache.writeQuery({ query: POST_FOR_USER, variables: { page: 1 }, data: { postForUser: [...newPostForOwnerCache] } })
            cache.writeQuery({ query: POST_OF_OWNER, variables: { page: 1 }, data: { postOfUser: [...newPostOfOwnerCache] } })
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