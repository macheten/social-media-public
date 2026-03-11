"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { getAuthUser } from "@shared/lib/get-auth-user";

export const deleteChat = async (chatId: string) => {
  const session = await getAuthUser()

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      members: { some: { userId: session.user.id } },
    },

    include: {
      members: {
        where: {
          userId: session.user.id
        }
      }
    }
  });

  if (!chat || (chat.type === 'PUBLIC' && chat.members[0]?.role !== 'OWNER')) {
    throw new Error("chat not found or no access");
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });
};
