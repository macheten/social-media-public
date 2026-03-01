"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { findExistingFriendship } from "@shared/lib/findExistingFriendship";

export interface CreateFriendshipProps {
  receiverId: string;
}

export const createFriendship = async ({
  receiverId,
}: CreateFriendshipProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("unauthorized");
  }

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
