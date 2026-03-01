import { FriendDTO } from "@mytypes/types";
import { axiosInstance } from "./instance";
import { FriendsSectionsType } from "../app/(root)/friends/page";

export interface FetchFriendsProps {
  cursor: string | null;
  section: FriendsSectionsType
}

export interface FetchFriendsRes {
  friends: FriendDTO[],
  hasNextPage: boolean
  nextCursor: string | null,
}

export const fetchFriends = async ({ cursor, section }: FetchFriendsProps) => {
  const cursorQuery = cursor ? `&cursor=${cursor}` : "";
  const { data } = await axiosInstance.get<FetchFriendsRes>(
    `/friends?section=${section}${cursorQuery}`,
  );
  return data;
};
