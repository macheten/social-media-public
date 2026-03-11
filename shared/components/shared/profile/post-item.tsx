"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import { WhiteBlock } from "../white-block";
import defaultAvatar from "@publicfiles/images/default-avatar.webp";
import { Button } from "../../ui/button";
import { Forward, MessageCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { EditPostModal } from "../modals/edit-post-modal";
import Link from "next/link";
import { PostDTO, SetReactionProps } from "@mytypes/types";
import { UpdatePostProps } from "@src/app/actions/profile/update-post";
import { ReactionsButtons } from "../reactions-buttons";
import { PostDropdownMenu, PostContextMenu } from "../posts/post-menus";

interface Props {
  className?: string;
  isProfileOwner: boolean;
  hideCommentsButton?: boolean;
  postItem: PostDTO;
  onEditPost: ({}: UpdatePostProps) => Promise<void>;
  handleDelete: (postId: string) => Promise<void>;
  handleSetReaction: ({}: SetReactionProps) => Promise<void>;
}

export const PostItem: React.FC<Props> = ({
  className,
  isProfileOwner,
  hideCommentsButton = false,
  postItem: post,
  onEditPost,
  handleDelete,
  handleSetReaction,
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    if (window.confirm("Вы точно хотите удалить этот пост?")) {
      try {
        setIsDeleting(true);
        await handleDelete(post.id);
        toast.success("Пост удалён");
      } catch (error) {
        toast.error("Не удалось удалить");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  const imageUrl = post.author.imageUrl;

  const handleAction = async (action: string) => {
    switch (action) {
      case "edit":
        setOpen(true);
        break;
      case "delete":
        await onClickDelete();
        break;
      case "share":
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_SITE_URL}/comments/${post.id}`,
        );
        toast.success("Ссылка скопирована");
        break;
      case "copy":
        navigator.clipboard.writeText(`${post.title}\n${post.content}`);
        toast.success("Текст скопирован");
        break;
    }
  };

  return (
    <PostContextMenu handleAction={handleAction}>
      <div
        className={cn(className, "max-w-150", {
          "pointer-events-none opacity-40 select-none": isDeleting,
        })}
      >
        <WhiteBlock className='p-3'>
          <div>
            <div className='flex justify-between'>
              <Link href={`/profile?userId=${post.authorId}`}>
                <div className='flex items-center'>
                  <img
                    width={50}
                    height={50}
                    className='w-12.5 h-12.5 object-cover rounded-full mr-3'
                    alt='аватарка'
                    src={imageUrl || defaultAvatar.src}
                  />
                  <div className='text-xl font-mono text-primary'>
                    {post.author.username}
                  </div>
                </div>
              </Link>

              <div className='self-start'>
                <PostDropdownMenu handleAction={handleAction} />
              </div>
            </div>
            <div className='text-2xl'>{post.title}</div>
            <div className='py-3 border-b mb-2 wrap-break-word whitespace-pre-wrap'>
              {post.content}
            </div>
            <div className='flex justify-between'>
              <div className='flex gap-1'>
                <ReactionsButtons
                  postId={post.id}
                  dislikes={post.reactions.dislikes}
                  likes={post.reactions.likes}
                  handleSetReaction={handleSetReaction}
                  userReaction={post.reactions.userReaction}
                />
              </div>

              <div className='flex gap-1'>
              {isProfileOwner && (
                  <EditPostModal
                    onClose={() => setOpen(false)}
                    open={open}
                    onEdit={onEditPost}
                    content={post.content}
                    title={post.title}
                    postId={post.id}
                  />
                )}
                {!hideCommentsButton && (
                  <Link href={`/comments/${post.id}`} scroll={false}>
                    <Button variant={"outline"}>
                      <MessageCircle />
                      <span>Комментарии {post.commentsCount}</span>
                    </Button>
                  </Link>
                )}
                </div>
            </div>
          </div>
        </WhiteBlock>
      </div>
    </PostContextMenu>
  );
};
