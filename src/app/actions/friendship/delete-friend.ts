'use server'

import { prisma } from "@db/prisma-client";
import { getAuthUser } from "@shared/lib/get-auth-user";

export const deleteFriend = async (friendshipId: string) => {
  const session = await getAuthUser()

  const res = await prisma.friendship.deleteMany({
    where: {
      id: friendshipId,
      OR: [{ receiverId: session.user.id }, { initiatorId: session.user.id }],
    },
  });

  if (res.count === 0) {
    throw new Error("Friendship not found");
  }
};
