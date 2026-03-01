"use client";

import React, { useCallback } from "react";
import { cn } from "@shared/lib/utils";
import { PostItem } from "./post-item";
import { Loader } from "lucide-react";
import { PostSkeleton } from "../../skeletons/post-skeleton";
import { useInfiniteScroll } from "@shared/lib/hooks/use-infinite-scroll";
import { usePosts } from "@shared/lib/hooks/use-posts";

interface Props {
  className?: string;
  userId: string;
  isProfileOwner: boolean;
}

export const PostsList: React.FC<Props> = ({
  className,
  userId,
  isProfileOwner,
}) => {
  const {
    endCursor: cursor,
    fetchPosts,
    fetchingPosts,
    handleDelete,
    handleEdit,
    hasNextPage,
    posts,
    initialLoading,
    handleSetReaction,
  } = usePosts({ userId });

  const loadMore = useCallback(async () => {
    await fetchPosts({ cursor, userId });
  }, [cursor, userId]);

  const { endOfPage } = useInfiniteScroll({
    fetching: fetchingPosts,
    hasNextPage,
    loadMore,
  });

  return (
    <div className={cn(className)}>
      {posts.map((post, i) => (
        <PostItem
          handleSetReaction={handleSetReaction}
          handleDelete={handleDelete}
          className='mb-3'
          onEditPost={handleEdit}
          key={post.id}
          isProfileOwner={isProfileOwner}
          postItem={post}
        />
      ))}
      {initialLoading && [...Array(5)].map((_, i) => <PostSkeleton key={i} />)}
      <div ref={endOfPage} className='py-6 flex justify-center'>
        {fetchingPosts && !initialLoading && (
          <Loader className='animate-spin ' />
        )}
      </div>
    </div>
  );
};
