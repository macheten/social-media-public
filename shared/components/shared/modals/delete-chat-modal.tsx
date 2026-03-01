import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/alert-dialog";
import { Trash } from "lucide-react";
import { useChatsStore } from "@src/store/chats";
import toast from "react-hot-toast";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";

interface Props {
  onClose: () => void;
  open: boolean;
  chatId: string;
}

export const DeleteChatModal: React.FC<Props> = ({ onClose, open, chatId }) => {
  const deleteChat = useChatsStore((state) => state.deleteChat);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter()
  const onClickDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteChat(chatId);
      onClose();
      router.push('/messenger')
      toast.success("Чат удалён");
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setIsDeleting(false)
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно хотите удалить чат?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы точно хотите удалить чат у обоих? Это нельзя будет отменить
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="w-21" variant={'outline'} loading={isDeleting}>
              Отмена
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction variant={'destructive'} asChild>
            <Button className="w-26" onClick={onClickDelete} loading={isDeleting}>
              <Trash />
              Удалить
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
