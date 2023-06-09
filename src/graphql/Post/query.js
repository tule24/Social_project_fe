import { gql } from "@apollo/client"

export const POST_FOR_USER = gql`
    query Query($page: Int) {
        postForUser(page: $page, limit: 5) {
            id
            creator {
              id
              name
              ava
            }
            content
            media
            totalLike
            liked
            vision
            totalComment
            createdAt
            updatedAt
        }
    }
`

export const POST_OF_USER = gql`
    query Query($userId: ID!, $page: Int) {
        postOfUser(userId: $userId, page: $page, limit: 5) {
            id
            content
            media
            totalLike
            liked
            vision
            totalComment
            createdAt
            updatedAt
        }
    }
`

export const POST_OF_OWNER = gql`
    query Query($page: Int) {
        postOfOwner(page: $page, limit: 5) {
            id
            content
            media
            totalLike
            liked
            vision
            totalComment
            createdAt
            updatedAt
        }
    }
`

export const POST_BY_ID = gql`
    query Post($postId: ID!) {
        post(postId: $postId) {
            id
            content
            media
            totalLike
            liked
            vision
            totalComment
            createdAt
            updatedAt
        }
    }
`

export const USER_LIKE_POST = gql`
    query Query($postId: ID!) {
        post(postId: $postId) {
            id
            userLike {
                id
                name
                ava
            }
        }
    }
`
export const USER_LIKE_FRAGMENT = gql`
    fragment Userlike on Post {
        userLike {
            id
            name
            ava
        }
    }
`