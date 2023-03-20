import { gql } from '@apollo/client'

export const REGISTER = gql`
    mutation Mutation($registerInput: registerInput!) {
        register(registerInput: $registerInput) {
            ... on User {
                id
                createdAt
            }
            ... on MsgResponse {
                code
                message
            }
        }
    }
`

export const LOGIN = gql`
    mutation Mutation($loginInput: loginInput!) {
        login(loginInput: $loginInput) {
            ... on Auth {
                token
                refreshToken
                user {
                    id
                    name
                    dob
                    email
                    ava
                    phone
                    address
                    updatedAt
                    friendList {
                        _id
                        name
                        ava
                        status
                    }   
                    messageRoomOfUser {
                        id
                        users {
                            id
                            name
                            ava
                        }
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

export const LOGOUT = gql`
    mutation Mutation {
        logout {
        code
        message
        }
    }
`