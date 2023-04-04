import { gql } from "@apollo/client"

export const NOTIFICATION_SUBSCRIPTION = gql`
    subscription Subscription {
        notificationCreated {
            id
            from {
                id
                name
                ava
            }
            option
            contentId
            content     
        }
    }
`