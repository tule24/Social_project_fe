import { gql } from "@apollo/client"

export const GET_NOTIFICATION = gql`
    query Notification($page: Int, $limit: Int) {
        getNotification(page: $page, limit: $limit)  {
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