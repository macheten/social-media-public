import { UserDTO } from "@mytypes/types";
import { create } from "zustand";
import { Api } from "../services";
import { Friendship } from "@prisma/client";

interface Store {
  profile: UserDTO;
  loading: boolean;
  error: boolean;
  friendshipExists: Friendship | null;

  getProfile: (id: string) => Promise<void>;
  setProfilePicture: (imageUrl: string) => void;
  setFriendshipExists: (friendship: Friendship) => void;
}

export const useProfileStore = create<Store>((set, get) => ({
  profile: {} as UserDTO,
  error: false,
  loading: true,
  friendshipExists: null,

  getProfile: async (id) => {
    try {
      set({ error: false, loading: true });
      const { profile, friendshipExists } = await Api.user.fetchProfile(id);
      set({ profile, friendshipExists });
    } catch (error) {
      console.error("GET PROFILE Store error", error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  setProfilePicture: (imageUrl) => {
    set((state) => ({ profile: { ...state.profile, imageUrl } }));
  },
  setFriendshipExists: (friendship) => {
    set({
      friendshipExists: friendship
    });
  },
}));
