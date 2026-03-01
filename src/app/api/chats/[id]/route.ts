import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { mapChatToDto } from "@shared/lib/map-to-dto/map-chat-to-dto";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session) {
    return NextResponse.json(
      { chat: null, message: "unauthorized error" },
      { status: 401 },
    );
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id,
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

  if (!chat) {
    return NextResponse.json(
      { chat: null, message: "Chat not found or access denied" },
      { status: 404 },
    );
  }

  return NextResponse.json({ chat: mapChatToDto(chat, session.user.id) });
}
