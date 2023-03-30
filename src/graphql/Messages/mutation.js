import { gql } from "@apollo/client"

export const CREATE_MESSAGE = gql`
    mutation createMessage($roomId: ID!, $content: String!) {
        createMessage(roomId: $roomId, content: $content) {
            id
            user {
                id
                name
                ava
            }
            content
            createdAt
        }
    }
`