import { gql } from "@apollo/client"

export const FRIEND_OF_OWNER = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            ... on User {
                id
                friendList {
                    _id
                    name
                    ava
                    status
                }
      
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const USER_BY_ID = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            ... on User {
                id
                name
                email
                ava
                phone
                address
                createdAt
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const ALL_USER = gql`
    query Query {
        users {
            ... on AllUser {
                totalUser
                users {
                    id
                    name
                    ava
                }
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`