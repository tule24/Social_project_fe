import { COMMENT_FRAGMENT, COMMENT_OF_POST } from '@/graphql'
import { toast } from 'react-toastify'

export const createCommentService = (postId, content, setLoadingComment) => {
    return {
        variables: {
            postId,
            content
        },
        update: (cache, { data }) => {
            const commentOfPostCache = cache.readQuery({ query: COMMENT_OF_POST, variables: { postId, page: 1 } })
            cache.writeQuery({ query: COMMENT_OF_POST, variables: { postId, page: 1 }, data: { commentOfPost: [{ ...data.createComment }, ...commentOfPostCache.commentOfPost] } })
        },
        onCompleted: () => { setLoadingComment(false) },
        onError: () => {
            toast.success('Something wrong when comment')
            setLoadingComment(false)
        }
    }
}

export const updateCommentService = (commentId, content) => {
    return {
        variables: {
            commentId,
            content
        },
        update: (cache, { data }) => {
            const commentUpdate = cache.readFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT })
            const { content } = data.updateComment
            cache.writeFragment({ id: `Comment:${commentId}`, fragment: COMMENT_FRAGMENT, data: { ...commentUpdate, content } })
        },
        onCompleted: () => {  },
        onError: () => {
            toast.success('Something wrong when comment')
            
        }
    }
}

export const deleteCommentService = (postId, commentId) => {
    return {
        variables: {
            commentId
        },
        update: (cache, { data }) => {
            const commentOfPostCache = cache.readQuery({ query: COMMENT_OF_POST, variables: { postId, page: 1 } })
            const newCommentOfPostCache = commentOfPostCache.commentOfPost.filter(el => el.id !== data.deleteComment.id)
            cache.writeQuery({ query: COMMENT_OF_POST, variables: { postId, page: 1 }, data: { commentOfPost: [...newCommentOfPostCache] } })
        },
        onCompleted: () => {  },
        onError: () => {
            toast.success('Something wrong when comment')
        }
    }
}