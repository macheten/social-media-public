"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { useCommentsState } from "@src/store/comments-state";
import { CommentItem } from "./comment-item";
import { useSession } from "next-auth/react";
import { CommentSkeleton } from "../../skeletons/comment-skeleton";
import { NoComments } from "./no-comments";

interface Props {
  className?: string;
  postId: string;
  handleLinkClick?: () => void
}

export const CommentsList: React.FC<Props> = ({ className, postId, handleLinkClick }) => {
  const {
    comments,
    fetchComments,
    hasNextPage,
    isFetchingComments,
    nextCursor,
    resetState,
  } = useCommentsState();
  const [initialLoading, setInitialLoading] = useState(true);
  const { data: session } = useSession();

  const endOfPage = useRef(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    setInitialLoading(true);
    fetchComments({ postId, cursor: null }).then(() =>
      setInitialLoading(false),
    );

    return () => {
      resetState();
    };
  }, []);

  useEffect(() => {
    if (isFetchingComments) return;
    observer.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchComments({ postId, cursor: nextCursor });
      }
    });

    observer.current.observe(endOfPage.current!);

    return () => {
      observer.current?.disconnect();
    };
  }, [isFetchingComments, nextCursor, hasNextPage]);

  return (
    <div className={cn(className)}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          handleLinkClick={handleLinkClick}
          isCommentCreator={session?.user.id === comment.authorId}
          {...comment}
          className='mb-3'
        />
      ))}
      {initialLoading &&
        [...Array(10)].map((_, i) => (
          <CommentSkeleton className='mb-3' key={i} />
        ))}
      {!initialLoading && comments.length === 0 && <NoComments />}
      <div className='pt-100 -mt-100' ref={endOfPage}></div>
    </div>
  );
};
