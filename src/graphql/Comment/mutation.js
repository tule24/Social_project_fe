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
        totalLike
        totalReplies
    }
`

export const LIKE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        likeComment(commentId: $commentId) {
            id
        }
    }
`

export const UNLIKE_COMMENT = gql`
    mutation Mutation($commentId: ID!) {
        unlikeComment(commentId: $commentId) {
            id
        }
    }
`

export const CREATE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $content: String!) {
        createReplies(commentId: $commentId, content: $content) {
            id
            creator {
              id
              name
              ava
            }
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
    mutation Mutation($commentId: ID!, $repliesId: ID!) {
        deleteReplies(commentId: $commentId, repliesId: $repliesId) {
            id
        }
    }
`

export const LIKE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!) {
        likeReplies(commentId: $commentId, repliesId: $repliesId) {
            id
        }
    }
`

export const UNLIKE_REPLIES = gql`
    mutation Mutation($commentId: ID!, $repliesId: ID!) {
        unlikeReplies(commentId: $commentId, repliesId: $repliesId) {
            id
        }
    }
`

export const REPLIES_FRAGMENT = gql`
    fragment RepliesEdit on Replies {
        id
        content
        totalLike
    }
`