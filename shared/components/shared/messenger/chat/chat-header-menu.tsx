import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import {
  BrushCleaning,
  Ellipsis,
  History,
  Trash,
  User,
  UserCircle,
} from "lucide-react";
import { DeleteChatModal } from "../../modals/delete-chat-modal";

interface Props {
  className?: string;
  chatId: string
}

export const ChatHeaderMenu: React.FC<Props> = ({ className, chatId }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='p-2 cursor-pointer'>
          <Ellipsis size={30} />
          
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserCircle />
          Показать профиль
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BrushCleaning />
          Очистить историю
        </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteModal(true)} variant='destructive'>
            <Trash />
            Удалить чат
          </DropdownMenuItem>
      </DropdownMenuContent> 

      <DeleteChatModal chatId={chatId} onClose={() => setOpenDeleteModal(false)} open={openDeleteModal} />   
    </DropdownMenu>
  );
};
