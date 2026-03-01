"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Button } from "../../ui/button";
import { MessageCircle, UserCheck, UserMinus } from "lucide-react";
import { deleteFriend } from "@src/app/actions/friendship/delete-friend";
import toast from "react-hot-toast";
import { useFriendsStore } from "@src/store/friends";

interface Props {
  buttonSize?: "sm" | "lg";
  friendshipId: string;
  friendName: string;
}

export const DeleteFriendMenu: React.FC<Props> = ({
  buttonSize,
  friendshipId,
  friendName,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const close = () => setOpen(false);
  const deleteFriendship = useFriendsStore((state) => state.deleteFriendship);

  const onClickDelete = async () => {
    try {
      if (window.confirm('Вы точно хотите удалить пользователя из друзей?')) {
        setLoading(true);
      close();
      await deleteFriend(friendshipId);
      deleteFriendship(friendshipId);
      toast.success(`Пользователь ${friendName} удалён из друзей`, {
        duration: 3000,
      });
      }
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard openDelay={300} open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <Button loading={loading} size={buttonSize || "default"}>
          <UserCheck />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent className='p-1 flex flex-col gap-1'>
        <Button
          onClick={onClickDelete}
          className='flex justify-start text-left border-none'
          variant={"destructive"}
        >
          <UserMinus />
          удалить из друзей
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};
