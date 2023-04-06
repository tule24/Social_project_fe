import { cache } from '@/ApolloProvider'
import { COMMENT_FRAGMENT, COMMENT_OF_POST, POST_FRAGMENT } from '@/graphql'
import { toast } from 'react-toastify'

export const createCommentService = (postId, content, setLoadingComment, setTotalComment) => {
    return {
        variables: {
            postId,
            content
        },
        update: (cache, { data }) => {
            const commentOfPostCache = cache.readQuery({
                query: COMMENT_OF_POST,
                variables: { postId, page: 1 }
            })
            if (commentOfPostCache) {
                cache.writeQuery({
                    query: COMMENT_OF_POST,
                    variables: { postId, page: 1 },
                    data: {
                        commentOfPost: [{ ...data.createComment, liked: false }, ...commentOfPostCache.commentOfPost]
                    }
                })
            }

            const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
            if (postUpdate) {
                const totalComment = postUpdate.totalComment + 1
                cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalComment } })
                setTotalComment(totalComment)
            }
        },
        onCompleted: () => { setLoadingComment(false) },
        onError: () => {
            toast.success('Something wrong when comment')
            setLoadingComment(false)
        }
    }
}

export const updateCommentService = (commentId, content, setLoading, setEditText) => {
    return {
        variables: {
            commentId,
            content
        },
        update: (cache, { data }) => {
            const commentUpdate = cache.readFragment({
                id: `Comment:${commentId}`,
                fragment: COMMENT_FRAGMENT
            })
            if (commentUpdate) {
                cache.writeFragment({
                    id: `Comment:${commentId}`,
                    fragment: COMMENT_FRAGMENT,
                    data: { ...commentUpdate, content: data.updateComment.content }
                })
            }
        },
        onCompleted: () => { setLoading(''); setEditText(false) },
        onError: (error) => {
            console.log(error)
            toast.error('Something wrong when update comment')
            setLoading('')
        }
    }
}

export const deleteCommentService = (postId, commentId, setLoading) => {
    return {
        variables: {
            commentId
        },
        update: (cache, { data }) => {
            const commentOfPostCache = cache.readQuery({
                query: COMMENT_OF_POST,
                variables: { postId, page: 1 }
            })
            if (commentOfPostCache) {
                cache.writeQuery({
                    query: COMMENT_OF_POST,
                    variables: { postId, page: 1 },
                    data: {
                        commentOfPost: commentOfPostCache.commentOfPost.filter(el => el.id !== data.deleteComment.id)
                    }
                })
            }

            const postUpdate = cache.readFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT })
            if (postUpdate) {
                const totalComment = postUpdate.totalComment - 1
                cache.writeFragment({ id: `Post:${postId}`, fragment: POST_FRAGMENT, data: { ...postUpdate, totalComment } })
            }
        },
        onCompleted: () => { setLoading('') },
        onError: () => {
            setLoading('')
            toast.error('Something wrong when delete comment')
        }
    }
}

export const likeCommentService = (commentId, setLiked, totalLike, setTotalLike) => {
    return {
        variables: {
            commentId
        },
        update: (cache, { data }) => {
            const commentUpdate = cache.readFragment({
                id: `Comment:${commentId}`,
                fragment: COMMENT_FRAGMENT
            })
            if (commentUpdate) {
                const totalLike = commentUpdate.totalLike + 1
                cache.writeFragment({
                    id: `Comment:${commentId}`,
                    fragment: COMMENT_FRAGMENT,
                    data: { ...commentUpdate, totalLike, liked: true }
                })
            }
        },
        onError: (error) => {
            setLiked(false)
            setTotalLike(totalLike - 1)
        }
    }
}

export const unlikeCommentService = (commentId, setLiked, totalLike, setTotalLike) => {
    return {
        variables: {
            commentId
        },
        update: (cache, { data }) => {
            const commentUpdate = cache.readFragment({
                id: `Comment:${commentId}`,
                fragment: COMMENT_FRAGMENT
            })
            if (commentUpdate) {
                const totalLike = commentUpdate.totalLike - 1
                cache.writeFragment({
                    id: `Comment:${commentId}`,
                    fragment: COMMENT_FRAGMENT,
                    data: { ...commentUpdate, totalLike, liked: false }
                })
            }
        },
        onError: (error) => {
            setLiked(true)
            setTotalLike(totalLike + 1)
        }
    }
}

export const updateLikeComment = (commentId, totalLike) => {
    const commentUpdate = cache.readFragment({
        id: `Comment:${commentId}`,
        fragment: COMMENT_FRAGMENT
    })
    if (commentUpdate) {
        cache.writeFragment({
            id: `Comment:${commentId}`,
            fragment: COMMENT_FRAGMENT,
            data: { ...commentUpdate, totalLike }
        })
    }
}