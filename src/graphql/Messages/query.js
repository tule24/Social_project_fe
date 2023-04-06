import { gql } from "@apollo/client"

export const GET_MESSAGE_ROOM = gql`
    query Message($roomId: ID!) {
        getMessageRoom(roomId: $roomId) {
            id
            messages {
                id
                creator {
                    id
                    name
                    ava
                }
                content {
                    message
                    createdAt
                }
            }
            updatedAt
        }
    }
`