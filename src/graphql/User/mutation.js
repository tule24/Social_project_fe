import { gql } from "@apollo/client"

export const UPDATE_USER = gql`
    mutation Mutation($userInput: registerInput!) {
        updateUser(userInput: $userInput) {
            ... on User {
                id
                name
                email
                ava
                phone
                address
                updatedAt
                createdAt
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation Mutation($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
            ... on User {
                id
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`  

export const ADD_FRIEND = gql`
    mutation Mutation($friendId: ID!) {
        addFriend(friendId: $friendId) {
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

export const CONFIRM_FRIEND = gql`
    mutation Mutation($friendId: ID!) {
        confirmFriend(friendId: $friendId) {
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

export const UNFRIEND = gql`
    mutation Mutation($friendId: ID!) {
        unFriend(friendId: $friendId) {
            ... on User {
                id
                friendList {
                  _id
                  name
                  status
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