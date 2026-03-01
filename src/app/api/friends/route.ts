import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";
import { mapFriendsToDto } from "@shared/lib/map-to-dto/map-friends-to-dto";
import { FriendsSectionsType } from "../../(root)/friends/page";
import { FriendshipStatus } from "@prisma/client";

const FRIENDS_PER_PAGE = 15;

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const section = searchParams.get("section") as FriendsSectionsType;

  if (!section) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const getSearchQuery = () => {
    switch (section) {
      case "allFriends":
        return {
          status: FriendshipStatus.ACCEPTED,
          OR: [
            { receiverId: session.user.id },
            { initiatorId: session.user.id },
          ],
        };
      case "incomingRequests":
        return {
          status: {
            not: FriendshipStatus.ACCEPTED,
          },
          receiverId: session.user.id,
        };
      case "outcomingRequests":
        return {
          status: {
            not: FriendshipStatus.ACCEPTED,
          },
          initiatorId: session.user.id,
        };
      default:
        return null;
    }
  };
  const whereCondition = getSearchQuery();

  if (!whereCondition) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const acceptedFriends = await prisma.friendship.findMany({
    where: whereCondition,

    take: FRIENDS_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      initiator: {
        select: {
          chats: {
            where: {
              chat: {
                type: "PRIVATE",
                members: {
                  some: {
                    userId: session.user.id
                  }
                }
              },
            },

            select: {
              chatId: true
            }
          },
          id: true,
          username: true,
          imageUrl: true,
        },
      },
      receiver: {
        select: {
          chats: {
            where: {
              chat: {
                type: "PRIVATE",
                members: {
                  some: {
                    userId: session.user.id
                  }
                }
              },
            },

            select: {
              chatId: true
            }
          },
          id: true,
          username: true,
          imageUrl: true,
        },
      },
    },
  });

  let friends = acceptedFriends.map((f) => mapFriendsToDto(f, session.user.id));
  const hasNextPage = friends.length > FRIENDS_PER_PAGE;
  const nextCursor = hasNextPage ? friends[friends.length - 1].id : null;
  friends = hasNextPage ? friends.slice(0, -1) : friends;

  return NextResponse.json({
    friends,
    hasNextPage,
    nextCursor,
  });
};
