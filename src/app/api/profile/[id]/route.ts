import { prisma } from "@db/prisma-client";
import { findExistingFriendship } from "@shared/lib/findExistingFriendship";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface GetProfileParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: GetProfileParams) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const profile = await prisma.user.findFirst({
      where: {
        id,
      },

      // исключение ненужных полей
      omit: {
        password: true,
        provider: true,
        providerId: true,
        email: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 },
      );
    }
    let friendshipExists = null

    if (session) {
      friendshipExists = await prisma.friendship.findFirst({
        where: {
          OR: [
            {
              initiatorId: session.user.id,
              receiverId: id,
            },
  
            {
              initiatorId: id,
              receiverId: session.user.id,
            },
          ],
        },
      });
    }
    return NextResponse.json({ message: "Success", profile, friendshipExists });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
