import { gql } from "@apollo/client"

export const POST_FOR_USER = gql`
    query Query($page: Int!) {
        postForUser(page: $page) {
            ... on AllPost {
                posts {
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
            ... on MsgResponse {
                code
                message
            }
        }
    }
`