import { FriendDTO } from "@mytypes/types";
import { create } from "zustand";
import { FetchFriendsProps } from "../services/friends";
import { Api } from "../services";
import {
  acceptFriendship,
  AcceptFriendshipProps,
} from "../app/actions/friendship/accept-friendship";

interface Store {
  items: FriendDTO[];
  nextCursor: string | null;
  hasNextPage: boolean;
  fetching: boolean;

  fetchFriendships: ({}: FetchFriendsProps) => Promise<void>;
  resetState: () => void;
  acceptFriendship: ({}: AcceptFriendshipProps) => Promise<void>;
  deleteFriendship: (friendshipId: string) => void;
}

export const useFriendsStore = create<Store>((set) => ({
  items: [],
  nextCursor: null,
  fetching: false,
  hasNextPage: true,

  deleteFriendship(friendshipId) {
    set((state) => ({
      items: state.items.filter((i) => i.id !== friendshipId),
    }));
  },

  async fetchFriendships(data) {
    try {
      set({ fetching: true });
      const { friends, hasNextPage, nextCursor } =
        await Api.friends.fetchFriends(data);
      set((state) => ({
        items: [...state.items, ...friends],
        hasNextPage,
        nextCursor,
      }));
    } catch (error) {
      console.log('ERROR')
    } finally {
      set({ fetching: false });
    }
  },

  async acceptFriendship(data) {
    await acceptFriendship(data);
    set((state) => ({
      items: state.items.filter((i) => i.id !== data.friendshipId),
    }));
  },

  resetState() {
    set({
      items: [],
      nextCursor: null,
      fetching: false,
      hasNextPage: true,
    });
  },
}));
