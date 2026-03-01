import { MessageDTO } from "@mytypes/types"
import { axiosInstance } from "./instance"

interface GetMessagesResp {
    messages: MessageDTO[]
    nextCursor: string | null,
    hasNextPage: boolean
}


export interface GetMessagesProps {
    chatId: string
    cursor: string | null
}

export const getMessages = async ({ chatId, cursor }: GetMessagesProps) => {
    const cursorQuery = cursor ? `?cursor=${cursor}` : ''
    const res = await axiosInstance.get<GetMessagesResp>(`/chats/${chatId}/messages${cursorQuery}`)
    return res.data
}