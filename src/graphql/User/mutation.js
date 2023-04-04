import { gql } from "@apollo/client"

export const UPDATE_USER = gql`
    mutation Mutation($userInput: registerInput!) {
        updateUser(userInput: $userInput) {
            id
            name
            email
            ava
            phone
            address
            updatedAt
            createdAt
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation Mutation($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
            ... on User {
                id
            }
        }
    }
`

export const ADD_FRIEND = gql`
    mutation Mutation($friendId: ID!) {
        addFriend(friendId: $friendId) {
            id
            name
            ava
            status
        }
    }
`

export const CONFIRM_FRIEND = gql`
    mutation Mutation($friendId: ID!) {
        confirmFriend(friendId: $friendId) {
            id
            name
            ava
            status
        }
    }
`

export const UNFRIEND = gql`
    mutation Mutation($friendId: ID!) {
        unFriend(friendId: $friendId) {
            id
            name
            ava
        }
    }
`

export const FRIEND_FRAGMENT = gql`
    fragment FriendUpdate on Friend {
        status
    }
`