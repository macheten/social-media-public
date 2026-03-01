import React, { useState } from "react";
import { FriendDTO } from "@mytypes/types";
import { FriendsSectionsType } from "@src/app/(root)/friends/page";
import { Button } from "../../ui/button";
import { Check, MessageCircle, X } from "lucide-react";
import { DeleteFriendMenu } from "./delete-friend-menu";
import defaultAvatar from "@publicfiles/images/default-avatar.png";
import toast from "react-hot-toast";
import { WriteUserButton } from "./write-user-button";
import { createChat } from "@src/app/actions/chats/create-chat";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  friend: FriendDTO;
  section: FriendsSectionsType;
  handleAccept: () => Promise<void>;
  handleCancel: () => Promise<void>;
  handleWrite?: () => void;
}

export const FriendshipRequest: React.FC<Props> = ({
  friend,
  section,
  handleAccept,
  handleWrite,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClickAccept = async () => {
    try {
      setLoading(true);
      await handleAccept();
      toast.success(`Заявка на дружбу от ${friend.user.username} принята`);
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  const onClickWrite = async () => {
    let chatId = friend.user.privateChatId;
    // если чат не существует, создаём
    if (!chatId) {
      const { newChatId } = await createChat({
        membersIds: [friend.user.id],
        type: "PRIVATE",
      });
      chatId = newChatId;
    }
    handleWrite?.();
    router.push(`/messenger?chatId=${chatId}`);
  };

  return (
    <div className='flex justify-between items-center py-3 px-5'>
      <div className='flex items-center'>
        <Image
          width={80}
          height={80}
          src={friend.user.imageUrl || defaultAvatar.src}
          className='rounded-full border mr-3'
          alt='avatar'
        />
        <div className='flex flex-col gap-2'>
          <div>{friend.user.username}</div>
        </div>
      </div>
      <div className='flex gap-2'>
        {section === "allFriends" && (
          <>
            <WriteUserButton
              hasChat={Boolean(friend.user.privateChatId)}
              onClickWrite={onClickWrite}
            />
            <DeleteFriendMenu
              friendName={friend.user.username}
              friendshipId={friend.id}
              buttonSize='sm'
            />
          </>
        )}

        {section === "incomingRequests" && (
          <>
            <Button
              className='w-28.5'
              loading={loading}
              variant={"destructiveHover"}
              size={"sm"}
            >
              <X />
              Отклонить
            </Button>
            <Button
              className='w-25'
              loading={loading}
              onClick={onClickAccept}
              variant={"accept"}
              size={"sm"}
            >
              <Check color='green' />
              Принять
            </Button>
          </>
        )}

        {section === "outcomingRequests" && (
          <Button onClick={() => {}} size={"sm"}>
            <X />
            Отменить
          </Button>
        )}
      </div>
    </div>
  );
};
