import { MESSAGE_SUBSCRIPTION } from "@/graphql"

export const createMessageService = (roomId, content, setLoadingMessage) => {
    return {
        variables: {
            roomId,
            content
        },
        onCompleted: () => { setLoadingMessage(false) },
        onError: (error) => {
            console.log(error)
            setLoadingMessage(false)
        }
    }
}

export const messageSubService = (subscribeToMore) => {
    return subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev
            const newMsg = {...subscriptionData.data.messageCreated}
            delete newMsg['roomId']
            let newMessages = [...prev.getMessageRoom.messages]
            if (newMessages.length === 0) {
                newMessages.push(newMsg)
            } else {
                const index = newMessages.findIndex(el => el.id === newMsg.id)
                if (index >= 0) {
                    newMessages[index] = newMsg
                } else {
                    newMessages.unshift(newMsg)
                }
            }
            return Object.assign({}, prev, {
                getMessageRoom: {
                    ...prev.getMessageRoom,
                    messages: [...newMessages]
                }
            })
        }
    })
}