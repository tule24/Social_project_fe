import { gql } from '@apollo/client'

export const REGISTER = gql`
    mutation Mutation($registerInput: registerInput!) {
        register(registerInput: $registerInput) {
            id
        }
    }
`

export const LOGIN = gql`
    mutation Mutation($loginInput: loginInput!) {
        login(loginInput: $loginInput) {
            user {
                id
                ava
                messageRoomOfUser {
                    id
                    users {
                        id
                        name
                        ava
                    }
                }
            }
            token
            refreshToken
        }
    }
`

export const LOGOUT = gql`
    mutation Mutation {
        logout
    }
`