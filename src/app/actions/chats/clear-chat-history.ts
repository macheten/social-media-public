"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";

export interface ClearChatHistoryProps {
  chatId: string;
  forAll: boolean;
}

export const clearChatHistory = async ({
  chatId,
  forAll,
}: ClearChatHistoryProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("unauthorized");
  }

  // ищем чат
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
    },

    include: {
      members: {
        where: {
          userId: session.user.id,
        },
      },
    },
  });

  // если чат не найден, либо в публичном чате НЕ создатель пытается очистить его для всех:
  if (
    !chat ||
    (chat.type === "PUBLIC" && forAll && chat.members[0].role !== "OWNER")
  ) {
    throw new Error("chat does not exist or no access");
  }

  if (forAll) {
    await prisma.message.deleteMany({
      where: {
        chatId,
      },
    });
  } else {
    const messagesToDelete = await prisma.message.findMany({
      where: {
        chatId,
        messageDeletions: {
          none: { deletedById: session.user.id },
        },
      },

      select: {
        id: true,
      },
    });
    await prisma.messageDeletion.createMany({
      data: messagesToDelete.map((m) => ({
        messageId: m.id,
        deletedById: session.user.id,
      })),
    });
  }
};
