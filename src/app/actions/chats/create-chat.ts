"use server";

import { prisma } from "@db/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ChatType, Prisma } from "@prisma/client";
import { pusherServer } from "@shared/lib/pusher/pusher-server";
import { mapChatToDto } from "@shared/lib/map-to-dto/map-chat-to-dto";

export interface CreateChatProps {
  type: ChatType;
  membersIds: string[];
}

export const createChat = async ({ membersIds, type }: CreateChatProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

  // ошибка если не передали список участников
  if (!membersIds.length) {
    throw new Error("membersIds can not be empty");
  }

  // добавление id пользователя который создал чат в список участников
  const allMembersIds = [...membersIds, session.user.id];

  // ошибка если приватный чат создаётся больше чем с 2 пользователями
  if (type === "PRIVATE" && allMembersIds.length > 2) {
    throw new Error("Private chat must have exactly 2 members");
  }

  // ошибка если приватный чат уже существует
  if (type === "PRIVATE") {
    const existingChat = await prisma.chat.findFirst({
      where: {
        members: {
          every: {
            userId: {
              in: allMembersIds,
            },
          },
        },
        type: "PRIVATE",
      },
    });
    if (existingChat) {
      throw new Error("chat already exists");
    }
  }

  let membersData = allMembersIds.map((m: string) => ({ userId: m }));

  // для того чтобы назначить владельцем публичного чата
  if (type === "PUBLIC") {
    membersData = membersData.map((m) => {
      if (m.userId === session.user.id) {
        return {
          userId: session.user.id,
          role: "OWNER",
        };
      }
      return m;
    });
  }

  const newChat = await prisma.chat.create({
    data: {
      type,
      members: {
        createMany: {
          data: membersData,
        },
      },
    },

    include: {
      members: {
        include: {
          user: {
            select: {
              username: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  await Promise.all(
    membersData.map((m) => {
      pusherServer.trigger(
        `private-user-${m.userId}`,
        "new-chat",
        mapChatToDto(newChat, m.userId),
      );
    }),
  );

  return { newChatId: newChat.id };
};
