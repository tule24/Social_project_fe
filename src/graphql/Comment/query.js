import { gql } from "@apollo/client"

export const COMMENT_OF_POST = gql`
    query CommentOfPost($postId: ID!, $page: Int!) {
      commentOfPost(postId: $postId, page: $page) {
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