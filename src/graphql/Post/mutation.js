import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation Mutation($postInput: postInput!) {
        createPost(postInput: $postInput) {
            id
            content
            media
            totalLike
            vision
            totalComment
            createdAt
        }
    }
`

export const UPDATE_POST = gql`
    mutation Mutation($postId: ID!, $postInput: postInput!) {
        updatePost(postId: $postId, postInput: $postInput) {
            id
            content
            media
            vision
        }
    }
`

export const DELETE_POST = gql`
    mutation Mutation($postId: ID!) {
        deletePost(postId: $postId) {
            id
        }
    }
`

export const HANDLE_LIKE = gql`
    mutation Mutation($postId: ID!) {
        handleLikePost(postId: $postId) {
            id
            totalLike
        } 
    }
`