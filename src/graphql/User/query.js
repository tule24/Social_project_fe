import { gql } from "@apollo/client"

export const GET_USER_INFO = gql`
    query User($userId: ID) {
        user(userId: $userId) {
            id
            name
            email
            ava
            phone
            address
            dob
            updatedAt
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
`

export const GET_FRIEND_LIST = gql`
    query User($userId: ID) {
        user(userId: $userId) {
            id
            friendList {
                _id 
                name
                ava
                status
            }
        }
    }
`

export const GET_NEW_FRIEND = gql`
    query User {
        users {
            id
            name
            ava
        }
    }
`

