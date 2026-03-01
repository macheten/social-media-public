import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

const MESSAGES_PER_REQUEST = 25;
export async function GET(
  req: NextRequest,
  { params }: Params,
) {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams
  const cursor = searchParams.get('cursor')

  if (!session) {
    return NextResponse.json(
      { messages: [], error: "unauthorized" },
      { status: 401 },
    );
  }
  

  if (!id) {
    return NextResponse.json({ messages: [], error: 'bad request' }, { status: 400 })
  }

  let messages = await prisma.message.findMany({
    where: {
      chatId: id,
      chat: {
        members: {
          some: { userId: session.user.id },
        },
      },

      messageDeletions: {
        none: {
          deletedById: session.user.id
        }
      }
    },

    include: {
        user: {
            select: {
                imageUrl: true,
                username: true,
            }
        }
    },

    take: MESSAGES_PER_REQUEST + 1,
    cursor: cursor ? { id: cursor } : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = messages.length > MESSAGES_PER_REQUEST;
  const nextCursor = hasNextPage ? messages[messages.length - 1].id : null;
  messages = hasNextPage ? messages.slice(0, -1) : messages;

  return NextResponse.json({
    messages,
    nextCursor,
    hasNextPage,
  });
}
