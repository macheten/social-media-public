"use client";

import { useInfiniteScroll } from "@shared/lib/hooks/use-infinite-scroll";
import { FriendsSectionsType } from "@src/app/(root)/friends/page";
import { useFriendsStore } from "@src/store/friends";
import React, { useCallback, useEffect, useState } from "react";
import { FriendshipRequest } from "./friendship-request";
import { FriendshipReqSkeleton } from "../../skeletons/friendship-req-skeleton";
import { FriendshipsNotFound } from "./friendships-not-found";

interface Props {
  section: FriendsSectionsType;
  onClickWrite?: () => void;
}

export const FriendshipsList: React.FC<Props> = ({ section, onClickWrite }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    fetchFriendships,
    fetching,
    hasNextPage,
    items,
    nextCursor,
    resetState,
    acceptFriendship,
  } = useFriendsStore();

  useEffect(() => {
    return () => resetState();
  }, [section]);

  useEffect(() => {
    if (!nextCursor) {
      setInitialLoading(true);
      fetchFriendships({
        cursor: null,
        section,
      }).then(() => setInitialLoading(false));
    }
  }, [section]);

  const loadMore = useCallback(async () => {
    if (nextCursor) {
      await fetchFriendships({ cursor: nextCursor, section });
    }
  }, [nextCursor, section]);

  const { endOfPage } = useInfiniteScroll({
    fetching,
    hasNextPage,
    loadMore,
  });
  return (
    <div>
      <div>
        {initialLoading
          ? [...Array(5)].map((_, i) => <FriendshipReqSkeleton key={i} />)
          : items.map((f) => (
              <FriendshipRequest
                handleWrite={onClickWrite}
                handleCancel={async () => {}}
                handleAccept={() =>
                  acceptFriendship({
                    friendshipId: f.id,
                  })
                }
                section={section}
                key={f.id}
                friend={f}
              />
            ))}

        {!initialLoading && items.length === 0 && (
          <div className='flex justify-center'>
            <FriendshipsNotFound section={section} />
          </div>
        )}
      </div>
      <div ref={endOfPage} className='py-2'></div>
    </div>
  );
};
