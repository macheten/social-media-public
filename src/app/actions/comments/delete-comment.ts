"use server";

import { prisma } from "@db/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Comment } from "@prisma/client";

interface ReturnType {
  success: boolean;
  deletedComment?: Comment
}

export async function deleteComment(id: string): Promise<ReturnType> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
    };
  }

  const deletedComment = await prisma.comment.delete({
    where: {
      id,
      authorId: session.user.id,
    },
  });

  if (!deletedComment) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    deletedComment
  };
}
