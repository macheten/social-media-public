"use server";

import { prisma } from "@db/prisma-client";
import { pusherServer } from "@shared/lib/pusher/pusher-server";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface EditMessageProps {
  messageId: string | null;
  content: string;
}

export const editMessage = async ({ content, messageId }: EditMessageProps) => {
  if (!messageId || !content) {
    throw new Error("bad request");
  }
  const session = await getAuthUser()

  const message = await prisma.message.update({
    where: {
      id: messageId,
      userId: session.user.id,
    },

    include: {
      user: {
        select: {
          username: true,
          imageUrl: true,
        },
      },
    },

    data: {
      content,
      edited: true
    },
  });

  if (!message) {
    throw new Error("message not found or no access");
  }

  await pusherServer.trigger(`private-chat-${message.chatId}`, 'edit-message', {
    messageId, content
  })

  return message;
};
