import { gql } from "@apollo/client"

export const COMMENT_OF_POST = gql`
    query Post($postId: ID!) {
        post(postId: $postId) {
            ... on Post {
                id
                commentList {
                  id
                  creator {
                    name
                    ava
                  }
                  content
                  media
                  createdAt
                  totalLike
                  replies {
                    id
                    creator {
                        id
                        name
                        ava
                    }
                    content
                    media
                    createdAt
                    totalLike
                  }
                }
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`