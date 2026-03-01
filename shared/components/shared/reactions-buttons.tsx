import React from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { ReactionsDTO, SetReactionProps } from "@mytypes/types";

interface Props extends ReactionsDTO {
  className?: string;
  commentId?: string
  postId?: string;
  handleSetReaction: ({}: SetReactionProps) => Promise<void>;
  size?: 'sm' | 'lg'
}

export const ReactionsButtons: React.FC<Props> = ({
  className,
  dislikes,
  likes,
  userReaction,
  handleSetReaction,
  commentId,
  postId
  , size
}) => {
  const itemId = commentId ? commentId : postId;

  if (!itemId) {
    throw new Error(
      "[reactions-buttons.tsx ERROR] itemId cannot be null/undefined",
    );
  }

  return (
    <div className={cn(className, "flex gap-1")}>
      <Button
      size={size}
        className='shadow-none border'
        variant={userReaction === "LIKE" ? "default" : "outline"}
        onClick={() =>
          handleSetReaction({
            id: itemId,
            type: "LIKE",
          })
        }
      >
        <ThumbsUp />
        <span>{likes}</span>
      </Button>
      <Button
      size={size}
        className='shadow-none border'
        variant={userReaction === "DISLIKE" ? "default" : "outline"}
        onClick={() =>
          handleSetReaction({
            id: itemId,
            type: "DISLIKE",
          })
        }
      >
        <ThumbsDown />
        <span>{dislikes}</span>
      </Button>
    </div>
  );
};
