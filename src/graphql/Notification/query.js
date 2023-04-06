import { gql } from "@apollo/client"

export const GET_NOTIFICATION = gql`
    query Notification($page: Int) {
        getNotification(page: $page, limit: 10)  {
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