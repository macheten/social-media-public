import {
  Comment,
  Friendship,
  Message,
  Post,
  ReactionType,
  User,
} from "@prisma/client";

export type UserDTO = Omit<
  User,
  "password" | "provider" | "providerId" | "email"
>;

export interface PersonDTO {
  id: string;
  username: string;
  imageUrl: string | null;
}

export interface CommentDTO extends Comment {
  author: {
    username: string;
    imageUrl: string | null;
  };
  reactions: ReactionsDTO;
}

export interface PostDTO extends Post {
  author: {
    username: string;
    imageUrl: string | null;
  };
  reactions: ReactionsDTO;
  commentsCount: number;
}

export interface ReactionsDTO {
  likes: number;
  dislikes: number;
  userReaction: ReactionType | null; // реакция зарегистрировавшегося пользователя
}

export interface ChatItemDTO {}

export interface MessageDTO extends Message {
  user: {
    username: string;
    imageUrl: string | null;
  };
}

export interface SetReactionProps {
  type: ReactionType;
  id: string;
}

export interface FriendDTO extends Omit<
  Friendship,
  "initiatorId" | "receiverId"
> {
  user: {
    id: string;
    username: string;
    imageUrl: string;
    privateChatId: string | null;
  };
}
