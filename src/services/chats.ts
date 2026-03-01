import { Chat } from "@prisma/client";
import { axiosInstance } from "./instance"

interface GetChatsResponse {
  chats: Chat[] | [];
  message: string;
}

interface GetChatByIdResponse {
  chat: Chat | null;
  message: string;
}

export const fetchChats = async () => {
    const { data } = await axiosInstance.get<GetChatsResponse>(`/chats`)
    return data
}

export const fetchChatById  = async (chatId: string) => {
    const { data } = await axiosInstance.get<GetChatByIdResponse>(`/chats/${chatId}`)
    return data
}