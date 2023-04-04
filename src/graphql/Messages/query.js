import { gql } from "@apollo/client"

export const GET_MESSAGE_ROOM = gql`
    query Message($roomId: ID!, $page: Int, $limit: Int) {
        getMessageRoom(roomId: $roomId, page: $page, limit: $limit) {
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