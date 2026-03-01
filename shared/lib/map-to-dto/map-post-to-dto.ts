import { PostDTO } from "@mytypes/types";
import { mapReactionsToDto } from "../get-reactions";

export const mapPostToDto = (post: any, authorizedId: string | undefined) => {
  let userReaction = null;

  if (authorizedId) {
    userReaction =
      post.reactions.find((r: any) => r.userId === authorizedId)?.type ??
      null;
  }
  
  const postRes: PostDTO = {
    author: post.author,
    authorId: post.authorId,
    commentsCount: post._count.comments,
    content: post.content,
    createdAt: post.createdAt,
    id: post.id,
    title: post.title,
    reactions: mapReactionsToDto(post.reactions, authorizedId)
  };
  return postRes;
};
