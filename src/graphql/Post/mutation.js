import { gql } from "@apollo/client"

export const CREATE_POST = gql`
    mutation Mutation($postInput: postInput!) {
        createPost(postInput: $postInput) {
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
            updatedAt
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
            createdAt
            updatedAt
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

export const LIKE_POST = gql`
    mutation Mutation($postId: ID!) {
        likePost(postId: $postId) {
            id
        } 
    }
`

export const UNLIKE_POST = gql`
    mutation Mutation($postId: ID!) {
        unlikePost(postId: $postId) {
            id
        } 
    }
`

export const POST_FRAGMENT = gql`
    fragment PostEdit on Post {
        id
        content
        media
        vision
        totalLike
        totalComment
    }
`