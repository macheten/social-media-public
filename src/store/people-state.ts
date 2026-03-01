import { PersonDTO } from "@mytypes/types";
import { create } from "zustand";
import { Api } from "../services";

interface Store {
  people: PersonDTO[];
  hasNextPage: boolean;
  nextCursor: string | null;
  isFetchingPeople: boolean;
  nameQuery: string;
  fetchError: boolean;

  fetchPeople: (cursor: string | null, username: string) => Promise<void>;
  resetState: () => void;
  setNameQuery: (nameQuery: string) => void;
}

export const usePeopleStore = create<Store>((set) => ({
  people: [],
  isFetchingPeople: false,
  hasNextPage: true,
  nextCursor: null,
  nameQuery: "",
  fetchError: false,

  async fetchPeople(cursor, username) {
    try {
      set({ isFetchingPeople: true, fetchError: false });
      const { hasNextPage, nextCursor, users } = await Api.user.fetchPeople(
        cursor,
        username,
      );
      set((state) => {
        if (!cursor) {
          return {
            hasNextPage,
            nextCursor,
            people: users,
          };
        }

        return { hasNextPage, nextCursor, people: [...state.people, ...users] };
      });
    } catch (error) {
      set({ fetchError: true });
      set({ people: [] });
    } finally {
      set({ isFetchingPeople: false });
    }
  },

  setNameQuery(nameQuery) {
    set({ nameQuery });
  },

  resetState() {
    set({
      nameQuery: "",
      fetchError: false,
      hasNextPage: true,
      nextCursor: null,
      people: [],
      isFetchingPeople: false,
    });
  },
}));
