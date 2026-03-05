"use client";

import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@shared/lib/utils";
import { WhiteBlock } from "../white-block";
import { usePeopleStore } from "@src/store/people-state";
import { PersonItem } from "./person-item";
import { Loader } from "lucide-react";
import { UserSkeleton } from "../../skeletons/user-skeleton";
import { useInfiniteScroll } from "@shared/lib/hooks/use-infinite-scroll";
import { NotFoundUsers } from "./not-found-users";
import { SearchInput } from "./search-input";

interface Props {
  className?: string;
}

export const PeopleList: React.FC<Props> = ({ className }) => {
  const {
    fetchPeople,
    hasNextPage,
    isFetchingPeople,
    nextCursor,
    people,
    nameQuery,
    resetState,
    fetchError,
  } = usePeopleStore();
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMore = useCallback(async () => {
    if (!fetchError) {
      await fetchPeople(nextCursor, nameQuery || "");
    }
  }, [nextCursor, fetchError]);

  const { endOfPage } = useInfiniteScroll({
    fetching: isFetchingPeople,
    hasNextPage,
    loadMore,
  });

  useEffect(() => {
    return () => resetState()
  }, [])

  useEffect(() => {
    initialFetchUsers()
  }, []);

  const initialFetchUsers = () => {
    setInitialLoading(true);
    fetchPeople(null, nameQuery || "").then(() => setInitialLoading(false));
  }

  return (
    <WhiteBlock className={cn(className, "p-4 w-full md:max-w-[600px] mb-3")}>
      <h1 className='text-2xl mb-3'>Поиск</h1>
      <SearchInput onSubmit={() => initialFetchUsers()} className='mb-5' />

      <div className='px-3'>
        {!initialLoading && people.map((p) => (
          <PersonItem
            className='mb-5'
            key={p.id}
            id={p.id}
            imageUrl={p.imageUrl}
            username={p.username}
          />
        ))}

        {initialLoading &&
          [...Array(10)].map((_, i) => (
            <UserSkeleton className='mb-5' key={i} />
          ))}
      </div>

      {fetchError && <div className="flex items-center justify-center">
        <NotFoundUsers />
        </div>}

      <div className='py-3 flex justify-center' ref={endOfPage}>
        {isFetchingPeople && !initialLoading && (
          <Loader className='animate-spin' />
        )}
      </div>
    </WhiteBlock>
  );
};
