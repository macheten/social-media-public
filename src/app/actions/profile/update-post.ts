"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { Post } from "@prisma/client";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface UpdatePostProps {
  postId: string;
  title: string;
  content: string
}

export async function updatePost({ content, postId, title }: UpdatePostProps): Promise<Post> {
  const session = await getAuthUser()

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },

    data: {
        content, title
    }
  });

  return updatedPost
}
