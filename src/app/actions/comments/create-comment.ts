"use server";

import { prisma } from "@db/prisma-client";
import { CommentDTO } from "@mytypes/types";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface CreateCommentProps {
  content: string;
  postId: string;
}

interface ReturnType {
  comment: CommentDTO;
}

export async function createComment(
  data: CreateCommentProps,
): Promise<ReturnType> {
  const session = await getAuthUser()

  const newComment = await prisma.comment.create({
    data: {
      content: data.content,
      authorId: session.user.id,
      postId: data.postId,
    },

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  return {
    comment: {
      ...newComment,
      reactions: {
        dislikes: 0,
        likes: 0,
        userReaction: null,
      },
    },
  };
}
