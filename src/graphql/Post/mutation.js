import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation Mutation($postInput: postInput!) {
        createPost(postInput: $postInput) {
            ... on Post {
                id
                creator {
                  id
                  name
                  ava
                }
                content
                media
                totalLike
                vision
                totalComment
                createdAt
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const UPDATE_POST = gql`
    mutation Mutation($postId: ID!, $postInput: postInput!) {
        updatePost(postId: $postId, postInput: $postInput) {
            ... on Post {
                id
                content
                media
                vision
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation Mutation($postId: ID!) {
        deletePost(postId: $postId) {
            ... on Post {
                id
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const HANDLE_LIKE = gql`
    mutation Mutation($postId: ID!) {
        handleLikePost(postId: $postId) {
            ... on Post {
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