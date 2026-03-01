import React from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import { Ellipsis, EllipsisVertical, X } from "lucide-react";
import { useRouter } from "next/navigation";
import defaultAvatar from "@publicfiles/images/default-avatar.png";
import Link from "next/link";
import { ChatHeaderMenu } from "./chat-header-menu";
import { Chat } from "@prisma/client";

interface Props {
  className?: string;
  authorizedId: string
  chat: Chat
}

export const ChatPanelHeader: React.FC<Props> = ({
  className,
  chat
}) => {
  const router = useRouter();
  return (
    <div className={cn(className, "flex border-b items-center px-3")}>
      <div className="flex flex-1 items-center">
        <Button
          className='shadow-none mr-6'
          onClick={() => router.push("/messenger")}
          variant={"outline"}
        >
          <X />
        </Button>
        <div
          className='flex items-center flex-1 p-2'
        >
          <img
            className='w-10 h-10 rounded-full mr-2'
            src={chat.imageUrl || defaultAvatar.src}
          />
          <div>{chat.title}</div>
        </div>
      </div>
      <ChatHeaderMenu chatId={chat.id} />
    </div>
  );
};
