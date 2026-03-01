import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { pusherServer } from "@shared/lib/pusher/pusher-server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const socket_id = formData.get("socket_id") as string;
  const channel_name = formData.get("channel_name") as string;

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 403 })
  }

  const userId = channel_name.replace('private-user-', '')

  if (userId !== session.user.id) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const auth = pusherServer.authorizeChannel(socket_id, channel_name)
  return NextResponse.json(auth)
}
