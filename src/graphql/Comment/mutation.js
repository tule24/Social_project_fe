import { gql } from "@apollo/client"

export const CREATE_COMMENT = gql`
    mutation Mutation($postId: ID!, $commentInput: commentInput!) {
        createComment(postId: $postId, commentInput: $commentInput) {
            id
            content
            createdAt
            totalLike
            totalReplies
        }
    }
`

export const UPDATE_COMMENT = gql`
    mutation Mutation($commentId: ID!, $commentInput: commentInput!) {
        updateComment(commentId: $commentId, commentInput: $commentInput) {
            id
            content
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        deleteComment(commentId: $commentId) {
            id
        }
    }
`

export const HANDLE_LIKE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        handleLikeComment(commentId: $commentId) {
            id
            totalLike
        }
    }
`

export const CREATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesInput: commentInput!) {
        createReplies(commentId: $commentId, repliesInput: $repliesInput) {
            id
            content
            createdAt
            totalLike
        }
    }
`

export const UPDATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!, $repliesInput: commentInput!) {
        updateReplies(commentId: $commentId, repliesId: $repliesId, repliesInput: $repliesInput) {
            id
            content
        }
    }
`

export const DELETE_REPLIES = gql`
    mutation Mutation($commentId: ID!) {
        deleteComment(commentId: $commentId) {
            id
        }
    }
`

export const HANDLE_LIKE_REPLIES = gql`
    mutation Mutation($commentId: ID!) {
        deleteComment(commentId: $commentId) {
            id
        }
    }
`