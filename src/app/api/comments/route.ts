import { prisma } from "@db/prisma-client";
import { mapReactionsToDto } from "@shared/lib/get-reactions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { CommentDTO } from "@mytypes/types";

const COMMENTS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("postId");
  const cursor = searchParams.get("cursor");

  if (!postId) {
    return NextResponse.json(
      { message: "postId must not be null" },
      { status: 400 },
    );
  }

  let comments = await prisma.comment.findMany({
    where: {
      postId,
    },

    take: COMMENTS_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true,
        },
      },

      reactions: {
        select: {
          userId: true,
          type: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  let hasNextPage = comments.length > COMMENTS_PER_PAGE;
  let nextCursor = hasNextPage ? comments[comments.length - 1].id : null;
  comments = hasNextPage ? comments.slice(0, -1) : comments;
  
  const commentsResp = comments.map((c): CommentDTO => ({
    ...c,
    reactions: mapReactionsToDto(c.reactions, session?.user.id)
  }));

  return NextResponse.json({
    comments: commentsResp,
    hasNextPage,
    nextCursor,
  });
}
