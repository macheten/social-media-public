import { Chat } from "@prisma/client";
import { create } from "zustand";
import { Api } from "../services";
import { createChat, CreateChatProps } from "../app/actions/chats/create-chat";
import { deleteChat } from "../app/actions/chats/delete-chat";

interface Store {
  chats: Chat[];
  currentChat: Chat | null;

  fetchChats: () => Promise<void>;
  createChat: (chat: Chat) => void;
  fetchChatById: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
}

export const useChatsStore = create<Store>((set) => ({
  chats: [],
  currentChat: null,

  async fetchChatById(chatId) {
    if (chatId) {
      const { chat } = await Api.chats.fetchChatById(chatId);
      set({ currentChat: chat });
    } else {
      set({ currentChat: null });
    }
  },

  async deleteChat(chatId: string) {
    await deleteChat(chatId);
    set((state) => ({ chats: state.chats.filter((c) => c.id !== chatId) }));
  },

  createChat(chat) {
    set(state => ({ chats: [chat, ...state.chats] }))
  },

  async fetchChats() {
    const { chats } = await Api.chats.fetchChats();
    set({ chats });
  },
}));
