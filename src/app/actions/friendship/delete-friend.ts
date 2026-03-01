'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";

export const deleteFriend = async (friendshipId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("unauthorized");
  }

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
