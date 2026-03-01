import { MessageDTO } from "@mytypes/types";
import { create } from "zustand";
import { Api } from "../services";
import { GetMessagesProps } from "../services/messages";

interface Store {
  messages: MessageDTO[];
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetching: boolean;

  fetchMessages: ({}: GetMessagesProps) => Promise<void>;
  addMessage: (message: MessageDTO) => void;
  resetState: () => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (messageId: string, content: string) => void
}

export const useMessagesStore = create<Store>((set) => ({
  messages: [],
  hasNextPage: true,
  nextCursor: null,
  isFetching: false,

  editMessage(messageId, content) {
    set((state) => ({
      messages: state.messages.map((m) => {
        if (m.id === messageId) {
          return {
            ...m, content, edited: true
          }
        }
        return m
      })
    }))
  },

  deleteMessage(messageId) {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== messageId),
    }));
  },

  async fetchMessages(data) {
    try {
      set({ isFetching: true });
      const { messages, hasNextPage, nextCursor } =
        await Api.messages.getMessages(data);
      set((state) => ({
        messages: [...messages.reverse(), ...state.messages],
        hasNextPage,
        nextCursor,
      }));
    } catch (error) {
    } finally {
      set({ isFetching: false });
    }
  },

  addMessage(message) {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  resetState() {
    set({
      messages: [],
      hasNextPage: true,
      nextCursor: null,
      isFetching: false,
    });
  },
}));
