'use server'

import { prisma } from "@db/prisma-client";

interface Props {
  currentUserId?: string;
  userId: string;
}

export const findExistingFriendship = async ({
  currentUserId,
  userId,
}: Props) => {
  if (currentUserId) {
    return null
  }
  const existingFriendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        {
          initiatorId: currentUserId,
          receiverId: userId,
        },

        {
          initiatorId: userId,
          receiverId: currentUserId,
        },
      ],
    },
  });

  return existingFriendship
};
