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
            vision
            totalComment
            updatedAt
        }
    }
`