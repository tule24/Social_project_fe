import { gql } from "@apollo/client"

export const CREATE_COMMENT = gql`
    mutation Mutation($postId: ID!, $commentInput: commentInput!) {
        createComment(postId: $postId, commentInput: $commentInput) {
            ... on Comment {
                id
                creator {
                  name
                  id
                  ava
                }
                content
                media
                createdAt
                totalLike
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const UPDATE_COMMENT = gql`
    mutation Mutation($commentId: ID!, $commentInput: commentInput!) {
         updateComment(commentId: $commentId, commentInput: $commentInput) {
            ... on Comment {
                id
                content
                media
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        deleteComment(commentId: $commentId) {
            ... on Comment {
                id
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const HANDLE_LIKE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        handleLikeComment(commentId: $commentId) {
            ... on Comment {
                id
                totalLike
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const CREATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesInput: commentInput!) {
        createReplies(commentId: $commentId, repliesInput: $repliesInput) {
            ... on Comment {
                id
                creator {
                  id
                  name
                  ava
                }
                content
                media
                createdAt
                totalLike
            }
        }
    }
`

export const UPDATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!, $repliesInput: commentInput!) {
        updateReplies(commentId: $commentId, repliesId: $repliesId, repliesInput: $repliesInput) {
            ... on Comment {
                id
                content
                media
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`   

export const DELETE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!) {
        deleteReplies(commentId: $commentId, repliesId: $repliesId) {
            ... on Comment {
                id
            }
        ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const HANDLE_LIKE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!) {
        handleLikeReplies(commentId: $commentId, repliesId: $repliesId) {
            ... on Comment {
                id
                totalLike
            }       
            ... on MsgResponse {
                code
                message
            }
        }
    }
`