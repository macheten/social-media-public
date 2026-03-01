export const mapChatToDto = (chat: any, authorizedId: string) => {
  if (chat.type === "PRIVATE") {
    const { members, ...chatWithoutMembers } = chat;
    const person = chat.members.find(
      (m: any) => m.userId !== authorizedId,
    )!.user;
    return {
      ...chatWithoutMembers,
      title: person.username,
      imageUrl: person.imageUrl,
    };
  }
  return chat;
};
