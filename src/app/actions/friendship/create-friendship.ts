"use server";

import { prisma } from "@db/prisma-client";
import { findExistingFriendship } from "@shared/lib/findExistingFriendship";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface CreateFriendshipProps {
  receiverId: string;
}

export const createFriendship = async ({
  receiverId,
}: CreateFriendshipProps) => {
  const session = await getAuthUser()

  const existingFriendship = await findExistingFriendship({
    currentUserId: session.user.id,
    userId: receiverId,
  });

  if (existingFriendship) {
    return {
      error: "friendship request already exists",
      id: existingFriendship.id,
    };
  }

  const friendship = await prisma.friendship.create({
    data: {
      initiatorId: session.user.id,
      receiverId,
    },
  });

  return { friendship };
};
