"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import { CommentDTO, SetReactionProps } from "@mytypes/types";
import defaultAvatar from "@publicfiles/images/default-avatar.webp";
import { CommentItemMenu } from "./comment-item-menu";
import { useCommentsState } from "@src/store/comments-state";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ReactionsButtons } from "../reactions-buttons";
import Image from "next/image";

interface Props extends CommentDTO {
  className?: string;
  isCommentCreator: boolean;
  handleLinkClick?: () => void;
}

export const CommentItem: React.FC<Props> = ({
  className,
  content,
  author,
  authorId,
  handleLinkClick,
  isCommentCreator,
  reactions,
  id,
}) => {
  const [deleting, setDeleting] = useState(false);
  const removeComment = useCommentsState((state) => state.removeComment);
  const setCommentReaction = useCommentsState(
    (state) => state.setCommentReaction,
  );
  const router = useRouter();
  const onClickDelete = async () => {
    try {
      if (window.confirm("Вы точно хотите удалить комментарий?")) {
        setDeleting(true);
        await removeComment(id);
        toast.success("Комментарий удалён");
      }
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setDeleting(false);
    }
  };

  const handleSetReaction = async (data: SetReactionProps) => {
    await setCommentReaction(data);
  };
  return (
    <div
      className={cn(className, "border dark:bg-accent bg-white max-w-150 rounded-2xl p-2", {
        "pointer-events-none opacity-40 select-none": deleting,
      })}
    >
      <div className='flex justify-between'>
        <div
          className='cursor-pointer'
          onClick={() => {
            handleLinkClick?.();
            setTimeout(() => {
              router.push(`/profile?userId=${authorId}`);
            }, 10);
          }}
        >
          <div className='flex items-center mb-2'>
            <Image
              width={40}
              height={40}
              src={author.imageUrl || defaultAvatar.src}
              alt='avatar'
              className='mr-3 rounded-full shadow border'
            />
            <div className='font-medium'>{author.username}</div>
          </div>
        </div>
        {isCommentCreator && <CommentItemMenu onClickDelete={onClickDelete} />}
      </div>
      <div>{content}</div>
      <div>
        <ReactionsButtons
          size={"sm"}
          handleSetReaction={handleSetReaction}
          commentId={id}
          dislikes={reactions.dislikes}
          likes={reactions.likes}
          userReaction={reactions.userReaction}
        />
      </div>
    </div>
  );
};
