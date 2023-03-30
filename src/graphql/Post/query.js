import { gql } from "@apollo/client"

export const POST_FOR_USER = gql`
    query Query($page: Int!) {
        postForUser(page: $page) {
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
            updatedAt
        }
    }
`

export const POST_OF_OWNER = gql`
    query Query($page: Int!) {
        postOfUser(page: $page) {
            id
            content
            media
            totalLike
            liked
            vision
            totalComment
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