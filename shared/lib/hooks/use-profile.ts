import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProfileStore } from "@src/store/profile-state";

export const useProfile = (userId: string) => {
  const [getProfile, profile, loading, friendshipExists, setFriendshipExists] =
    useProfileStore(
      useShallow((state) => [
        state.getProfile,
        state.profile,
        state.loading,
        state.friendshipExists,
        state.setFriendshipExists,
      ]),
    );

  useEffect(() => {
    async function fetch() {
      await getProfile(userId);
    }

    fetch();
  }, [userId]);

  return {
    profile,
    loading,
    friendshipExists,
    setFriendshipExists,
  };
};
