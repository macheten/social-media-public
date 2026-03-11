'use server'

import { prisma } from "@db/prisma-client";
import { pusherServer } from "@shared/lib/pusher/pusher-server";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface DeleteMessageProps {
  messageId: string;
  deleteForEveryone: boolean;
}

export const deleteMessage = async ({
  deleteForEveryone,
  messageId,
}: DeleteMessageProps) => {
  const session = await getAuthUser()

  const message = await prisma.message.findFirst({
    where: {
      id: messageId,
      chat: {
        members: { some: { userId: session.user.id } },
      },
    },

    include: {
      chat: {
        select: {
          id: true,
          type: true,
          members: {
            where: {
              userId: session.user.id
            }
          }
        },
      },
    },
  });

  if (!message) {
    throw new Error("not found or no access");
  }

  const chatType = message.chat.type;
  const isMessageOwner = message.userId === session.user.id;
  const userRole = message.chat.members[0].role;

  if (deleteForEveryone && chatType === 'PUBLIC' && !isMessageOwner && userRole !== 'OWNER') {
    throw new Error('no access')
  }

  if (!deleteForEveryone) {
    await prisma.messageDeletion.create({
      data: {
        deletedById: session.user.id,
        messageId,
      },
    });
  } else {
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    await pusherServer.trigger(`private-chat-${message.chat.id}`, 'delete-message-for-all', messageId)
  }
};
