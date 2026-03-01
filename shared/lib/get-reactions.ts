import { ReactionsDTO } from "@mytypes/types";

export const mapReactionsToDto = (
  reactions: any,
  authorizedId: string | undefined,
): ReactionsDTO => {
  let userReaction = null;

  if (authorizedId) {
    userReaction =
      reactions.find((r: any) => r.userId === authorizedId)?.type ?? null;
  }

  return {
    likes: reactions.filter((r: any) => r.type === "LIKE").length,
    dislikes: reactions.filter((r: any) => r.type === "DISLIKE").length,
    userReaction,
  };
};
