import { gql } from "@apollo/client"

export const MESSAGE_SUBSCRIPTION = gql`
    subscription Subscription {
        messageCreated {
            id
            roomId
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
    }
`