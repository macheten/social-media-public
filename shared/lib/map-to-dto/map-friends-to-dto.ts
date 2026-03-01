import { Friendship } from "@prisma/client";

interface FriendProp extends Friendship {
  initiator: {
    id: string;
    username: string;
    imageUrl: string | null;
    chats: { chatId: string }[];
  };

  receiver: {
    id: string;
    username: string;
    imageUrl: string | null;
    chats: { chatId: string }[];
  };
}

export const mapFriendsToDto = (friend: FriendProp, authorizedId: string) => {
  const {
    receiverId,
    initiatorId,
    initiator: _initiator,
    receiver: _receiver,
    ...friendship
  } = friend;
  const { chats: initiatorChats, ...initiator } = _initiator;
  const { chats: receiverChats, ...receiver } = _receiver;
  return friend.receiverId !== authorizedId
    ? {
        ...friendship,
        user: { ...receiver, privateChatId: receiverChats[0]?.chatId || null },
      }
    : {
        ...friendship,
        user: {
          ...initiator,
          privateChatId: initiatorChats[0]?.chatId || null,
        },
      };
};
