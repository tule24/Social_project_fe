import { gql } from "@apollo/client"

export const GET_AVA = gql`
    query User($userId: ID) {
        user(userId: $userId) {
            ava
        }
    }
`

export const GET_USER_INFO = gql`
    query User($userId: ID) {
        user(userId: $userId) {
            name
            email
            ava
            phone
            address
            dob
            updatedAt
            totalFriend
            totalPost
        }
    }
`