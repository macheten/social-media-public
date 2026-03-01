import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@db/prisma-client";
import { mapChatToDto } from "@shared/lib/map-to-dto/map-chat-to-dto";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { chats: [], message: "unauthorized" },
      { status: 403 },
    );
  }

  let chats = await prisma.chat.findMany({
    where: {
      members: {
        some: { userId: session.user.id },
      },
    },

    include: {
      members: {
        include: {
          user: {
            select: {
              username: true,
              imageUrl: true
            }
          }
        }
      },
    },
  });


  // @ts-ignore
  chats = chats.map((c) => mapChatToDto(c, session.user.id));

  return NextResponse.json({ chats, message: "success" });
}
