import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Clock, UserCheck, UserPlus } from "lucide-react";
import { createFriendship } from "@src/app/actions/friendship/create-friendship";
import toast from "react-hot-toast";
import { Friendship, FriendshipStatus } from "@prisma/client";
import { DeleteFriendMenu } from "../friends/delete-friend-menu";

interface Props {
  username: string
  userId: string;
  friendshipExists: Friendship | null;
  onClickAddFriend: (friendship: Friendship) => void;
}

export const AddFriendButton: React.FC<Props> = ({
  userId,
  friendshipExists,
  onClickAddFriend,
  username
}) => {
  const [loading, setLoading] = useState(false);
  const handleAddFriend = async () => {
    try {
      setLoading(true);
       const { friendship } =  await createFriendship({
        receiverId: userId,
      });
      if (!friendship) {
        throw new Error()
      }
      onClickAddFriend(friendship);
      toast.success("Заявка на дружбу отправлена!");
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  if (friendshipExists?.status === "PENDING") {
    return (
      <Button variant={"outline"}>
        <Clock />
        Заявка отправлена
      </Button>
    );
  }

  if (friendshipExists?.status === "ACCEPTED") {
    return <DeleteFriendMenu friendName={username} friendshipId={friendshipExists.id} />;
  }

  if (!friendshipExists) {
    return (
      <Button
        onClick={handleAddFriend}
        className='w-44'
        loading={loading}
        variant={"outline"}
      >
        <UserPlus />
        Добавить в друзья
      </Button>
    );
  }
};
