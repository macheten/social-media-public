import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { Button } from "@shared/components/ui/button";
import { Menu, SquarePen, Users } from "lucide-react";
import { CreateChatModal } from "../../modals/create-chat-modal";
import { useCreateChatModal } from "@src/store/create-chat-modal";

interface Props {
  className?: string;
}

export const ChatListMenu: React.FC<Props> = ({ className }) => {
  const { onOpen } = useCreateChatModal()
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='shadow-none' variant={"outline"}>
            <Menu />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={onOpen}>
            <SquarePen /> написать
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users /> создать группу
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
