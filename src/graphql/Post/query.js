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
            vision
            totalComment
            createdAt
        }
    }
`

export const POST_OF_USER = gql`
    query Query($page: Int!, $userId: ID) {
        postOfUser(page: $page, userId: $userId) {
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