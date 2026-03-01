"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";

export interface AcceptFriendshipProps {
    friendshipId: string
}

export const acceptFriendship = async ({ friendshipId }: AcceptFriendshipProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("unauthorized");
  }

  await prisma.friendship.update({
    where: {
        id: friendshipId
    },

    data: {
        status: 'ACCEPTED'
    }
  })


};
