import { prisma } from "@db/prisma-client";
import { PostDTO } from "@mytypes/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { mapPostToDto } from "@shared/lib/map-to-dto/map-post-to-dto";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!id) {
    return NextResponse.json({ message: "Укажите id" }, { status: 400 });
  }

  const post = await prisma.post.findFirst({
    where: {
      id,
    },

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true,
        },
      },

      reactions: {
        select: {
          type: true,
          userId: true,
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json(
      { post: null, message: "Пост не найден" },
      { status: 404 },
    );
  }

  const postRes = mapPostToDto(post, session?.user.id)

  return NextResponse.json({
    post: postRes,
  });
}
