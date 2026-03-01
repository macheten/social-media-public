import { prisma } from "@db/prisma-client";
import { pusherServer } from "@shared/lib/pusher/pusher-server";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const socket_id = formData.get("socket_id") as string;
  const channel_name = formData.get("channel_name") as string;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  const chatId = channel_name.replace("private-chat-", "");

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      members: {
        some: { userId: session.user.id },
      },
    },
  });

  if (!chat) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const auth = pusherServer.authorizeChannel(socket_id, channel_name);
  return NextResponse.json(auth);
}
