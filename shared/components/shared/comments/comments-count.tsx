'use client';

import React from "react";
import { cn } from "@shared/lib/utils";
import { useCommentsState } from "@src/store/comments-state";
import { Skeleton } from "../../ui/skeleton";

interface Props {
  marginClassName?: string;
}

export const CommentsCount: React.FC<Props> = ({ marginClassName }) => {
  const commentsCount = useCommentsState((state) => state.post?.commentsCount);
  const loading = useCommentsState((state) => state.fetchingPost);
  const notFound = useCommentsState((state) => state.notFound);

  if (notFound) {
    return null
  }

  if (loading) {
    return <Skeleton className={cn(marginClassName, "h-5 w-50")} />
  }

  return <h1 className={cn(marginClassName, 'text-lg')}>Комментарии ({commentsCount})</h1>;
};
