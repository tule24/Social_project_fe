import { gql } from "@apollo/client"

export const CREATE_COMMENT = gql`
    mutation Mutation($postId: ID!, $content: String!) {
        createComment(postId: $postId, content: $content) {
            id
            creator {
              id
              name
              ava
            }
            content
            createdAt
            totalLike
            totalReplies
        }
    }
`

export const UPDATE_COMMENT = gql`
    mutation Mutation($commentId: ID!, $content: String!) {
        updateComment(commentId: $commentId, content: $content) {
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

export const COMMENT_FRAGMENT = gql`
    fragment CommenEdit on Comment {
        id
        content
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
    mutation Mutation($commentId: ID!, $content: String!) {
        createReplies(commentId: $commentId, content: $content) {
            id
            content
            createdAt
            totalLike
        }
    }
`

export const UPDATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!, $content: String!) {
        updateReplies(commentId: $commentId, repliesId: $repliesId, content: $content) {
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