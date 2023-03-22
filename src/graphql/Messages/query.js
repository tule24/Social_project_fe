import { gql } from "@apollo/client"

export const MESSAGE_ROOM_OF_USER = gql`
    query User($userId: ID) {
        user(userId: $userId) {
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