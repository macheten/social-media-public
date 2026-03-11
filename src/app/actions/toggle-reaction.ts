"use server";

import { ReactionType } from "@prisma/client";
import { prisma } from "@db/prisma-client";
import { mapReactionsToDto } from "@shared/lib/get-reactions";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface ToggleReactionProps {
  commentId?: string;
  postId?: string;
  type: ReactionType;
}

export async function toggleReaction({
  commentId,
  postId,
  type,
}: ToggleReactionProps) {
  const session = await getAuthUser()

  if ((!commentId && !postId) || (commentId && postId)) {
    throw new Error(
      "[toggleReaction] Error: надо указать либо commentId, либо postId",
    );
  }

  const existingReaction = await prisma.reaction.findFirst({
    where: {
      userId: session.user.id,
      OR: [
        { commentId: commentId || undefined },
        { postId: postId || undefined },
      ],
    },
  });

  if (existingReaction) {
    if (existingReaction.type === type) {
      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    } else {
      await prisma.reaction.update({
        where: {
          id: existingReaction.id,
        },

        data: {
          type,
        },
      });
    }
  } else {
    await prisma.reaction.create({
      data: {
        type,
        userId: session.user.id,
        postId: postId || undefined,
        commentId: commentId || undefined,
      },
    });
  }

  const reactions = await prisma.reaction.findMany({
    where: {
      ...(commentId ? { commentId } : { postId }),
    },
    select: {
      type: true,
      userId: true,
    },
  });

  return {
    reactions: mapReactionsToDto(reactions, session.user.id),
  };
}
