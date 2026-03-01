"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { useRouter } from "next/navigation";
import { CommentsList } from "../comments/comments-list";
import { ScrollArea } from "../../ui/scroll-area";
import { CreateCommentForm } from "../forms/create-comment-form";
import notFoundIcon from "@publicfiles/icons/not-found.svg";
import { useCommentsState } from "@src/store/comments-state";
import { CommentsCount } from "../comments/comments-count";

interface Props {
  postId: string;
}

export const CommentsModal: React.FC<Props> = ({ postId }) => {
  const router = useRouter();
  const fetchPostById = useCommentsState((state) => state.fetchPostById);
  const notFound = useCommentsState((state) => state.notFound);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await fetchPostById(postId);
    };
    fetch();
  }, [postId]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className='flex flex-col'>
        <DialogTitle hidden />

        {notFound ? (
          <div className='flex items-center flex-col'>
            <DialogTitle className='text-xl text-center'>
              Пост не найден ❌
            </DialogTitle>
            <img
              src={notFoundIcon.src}
              width={100}
              height={100}
              alt='not found'
            />
          </div>
        ) : (
          <div>
            <DialogTitle title='комментарии' asChild>
              <CommentsCount marginClassName='mb-3' />
            </DialogTitle>
            <CreateCommentForm className='mb-3' postId={postId} />
            <ScrollArea className='h-90 px-4 -ml-4'>
              <CommentsList
                handleLinkClick={() => {
                  router.back();
                  setOpen(false);
                }}
                postId={postId}
              />
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
