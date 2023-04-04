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

export const REFRESHTOKEN = gql`
    mutation Mutation($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            token
            refreshToken
        }
    }
`