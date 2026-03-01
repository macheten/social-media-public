import { prisma } from "@db/prisma-client";
import { mapPostToDto } from "@shared/lib/map-to-dto/map-post-to-dto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const ITEMS_PER_PAGE = 10;
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const cursor = searchParams.get("cursor");
    const session = await getServerSession(authOptions)

    if (!userId) {
      return NextResponse.json(
        { message: "Неправильный запрос. Укажите userId" },
        { status: 400 }
      );
    }

    let posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },

      // запрос на 1 страницу больше чем надо для того чтобы узнать, есть ли след. страница
      take: ITEMS_PER_PAGE + 1,
      cursor: cursor ? { id: cursor } : undefined,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: {
          select: {
            username: true,
            imageUrl: true
          }
        },

        reactions: {
          select: {
            type: true,
            userId: true
          }
        },

        _count: {
          select: {
            comments: true
          }
        }
      }
    });

    // если вернулось постов больше чем ITEMS_PER_PAGE, то след. страница есть
    // в другом случае нету
    const hasNextPage = posts.length > ITEMS_PER_PAGE;

    // если есть след. страница, то следующим курсором будет id последнего поста
    // эта строка должна быть до posts.slice()
    const endCursor = hasNextPage ? posts[posts.length - 1].id : null;

    // если есть след. страница, срезаем последний лишний элемент
    // если нету след. страницы, то возвращаем просто posts
    posts = hasNextPage ? posts.slice(0, -1) : posts;
    // @ts-ignore
    posts = posts.map((post) => {
      return mapPostToDto(post, session?.user.id)
    })

    return NextResponse.json({
      posts,
      hasNextPage,
      endCursor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 }
    );
  }
}
