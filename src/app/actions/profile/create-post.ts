"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { PostDTO } from "@mytypes/types";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface CreatePostProps {
  title: string;
  content: string;
}

interface ReturnType {
  success: boolean;
  post: PostDTO
}

export async function createPost({
  content,
  title,
}: CreatePostProps): Promise<ReturnType> {
  const session = await getAuthUser()

  const newPost = await prisma.post.create({
    data: {
      content,
      title,
      authorId: session.user.id,
    },

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true
        }
      }
    }
  });

  return {
    success: true,
    post: {
      ...newPost,
       reactions: {
        likes: 0,
        dislikes: 0,
        userReaction: null
      },
      commentsCount: 0
    },
  };
}
