"use server";

import { prisma } from "@db/prisma-client";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface AcceptFriendshipProps {
    friendshipId: string
}

export const acceptFriendship = async ({ friendshipId }: AcceptFriendshipProps) => {
  const session = await getAuthUser()

  await prisma.friendship.update({
    where: {
        id: friendshipId
    },

    data: {
        status: 'ACCEPTED'
    }
  })


};
