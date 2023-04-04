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
        liked
        content
        createdAt
        totalLike
        totalReplies
      }
    }
`

export const REPLIES_OF_COMMENT = gql`
    query RepliesOfComment($commentId: ID!, $page: Int!) {
      repliesOfComment(commentId: $commentId, page: $page) {
        id
        creator {
          id
          name
          ava
        }
        liked
        content
        createdAt
        totalLike
      }
    }
`

export const USER_LIKE_COMMENT = gql`
    query Query($commentId: ID!) {
      commentById(commentId: $commentId) {
            id
            userLike {
                id
                name
                ava
            }
        }
    }
`

export const USER_LIKE_REPLIES = gql`
    query Query($commentId: ID!, $repliesId: ID!) {
      repliesById(commentId: $commentId, repliesId: $repliesId) {
            id
            userLike {
                id
                name
                ava
            }
        }
    }
`