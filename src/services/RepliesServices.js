import { REPLIES_OF_COMMENT, REPLIES_FRAGMENT, COMMENT_FRAGMENT } from '@/graphql'
import { toast } from 'react-toastify'

export const createRepliesService = (commentId, content, setLoadingRep) => {
    return {
        variables: {
            commentId,
            content
        },
        update: (cache, { data }) => {
            const repliesOfCommentCache = cache.readQuery({
                query: REPLIES_OF_COMMENT,
                variables: { commentId, page: 1 }
            })
            if (repliesOfCommentCache) {
                cache.writeQuery({
                    query: REPLIES_OF_COMMENT,
                    variables: { commentId, page: 1 },
                    data: {
                        repliesOfComment: [{ ...data.createReplies, liked: false }, ...repliesOfCommentCache.repliesOfComment]
                    }
                })
            }

            const commentUpdate = cache.readFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT })
            if (commentUpdate) {
                const totalReplies = commentUpdate.totalReplies + 1
                cache.writeFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT, data: { ...commentUpdate, totalReplies } })
            }
        },
        onCompleted: () => { setLoadingRep(false) },
        onError: (error) => {
            toast.error('Something wrong when replies')
            setLoadingRep(false)
        }
    }
}

export const updateRepliesService = (commentId, repliesId, content, setLoading, setEditText) => {
    return {
        variables: {
            commentId,
            repliesId,
            content
        },
        update: (cache, { data }) => {
            const repliesOfCommentCache = cache.readFragment({
                id: `Replies:${repliesId}`,
                fragment: REPLIES_FRAGMENT
            })
            if (repliesOfCommentCache) {
                const { content } = data.updateReplies
                cache.writeFragment({
                    id: `Replies:${repliesId}`,
                    fragment: REPLIES_FRAGMENT,
                    data: { ...repliesOfCommentCache, content }
                })
            }
        },
        onCompleted: () => { setLoading(''); setEditText(false) },
        onError: (error) => {
            toast.error('Something wrong when update replies')
            setLoading('')
        }
    }
}

export const deleteRepliesService = (commentId, repliesId, setLoading) => {
    return {
        variables: {
            commentId,
            repliesId
        },
        update: (cache, { data }) => {
            const repliesOfCommentCache = cache.readQuery({
                query: REPLIES_OF_COMMENT,
                variables: { commentId, page: 1 }
            })
            if (repliesOfCommentCache) {
                cache.writeQuery({
                    query: REPLIES_OF_COMMENT,
                    variables: { commentId, page: 1 },
                    data: {
                        repliesOfComment: repliesOfCommentCache.repliesOfComment.filter(el => el.id !== data.deleteReplies.id)
                    }
                })
            }

            const commentUpdate = cache.readFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT })
            if (commentUpdate) {
                const totalReplies = commentUpdate.totalReplies - 1
                cache.writeFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT, data: { ...commentUpdate, totalReplies } })
            }
        },
        onCompleted: () => { setLoading('') },
        onError: (error) => {
            toast.error('Something wrong when delete replies')
            setLoading('')
        }
    }
}

export const likeRepliesService = (commentId, repliesId, setLiked, totalLike, setTotalLike) => {
    return {
        variables: {
            commentId,
            repliesId
        },
        update: (cache, { data }) => {
            const repliesOfCommentCache = cache.readFragment({
                id: `Replies:${repliesId}`,
                fragment: REPLIES_FRAGMENT
            })
            if (repliesOfCommentCache) {
                const totalLike = repliesOfCommentCache.totalLike + 1
                cache.writeFragment({
                    id: `Replies:${repliesId}`,
                    fragment: REPLIES_FRAGMENT,
                    data: { ...repliesOfCommentCache, totalLike, liked: true }
                })
            }
        },
        onError: (error) => {
            setLiked(false)
            setTotalLike(totalLike - 1)
        }
    }
}

export const unlikeRepliesService = (commentId, repliesId, setLiked, totalLike, setTotalLike) => {
    return {
        variables: {
            commentId,
            repliesId
        },
        update: (cache, { data }) => {
            const repliesOfCommentCache = cache.readFragment({
                id: `Replies:${repliesId}`,
                fragment: REPLIES_FRAGMENT
            })
            if (repliesOfCommentCache) {
                const totalLike = repliesOfCommentCache.totalLike - 1
                cache.writeFragment({
                    id: `Replies:${repliesId}`,
                    fragment: REPLIES_FRAGMENT,
                    data: { ...repliesOfCommentCache, totalLike, liked: false }
                })
            }
        },
        onError: (error) => {
            setLiked(true)
            setTotalLike(totalLike + 1)
        }
    }
}