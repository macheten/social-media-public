"use server";

import { prisma } from "@db/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { CommentDTO } from "@mytypes/types";

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
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

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
