import React from "react";
import { cn } from "@shared/lib/utils";
import { MessageDTO } from "@mytypes/types";
import defaultAvatar from "@publicfiles/images/default-avatar.webp";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@shared/components/ui/context-menu";
import { MessageContextMenu } from "./message-context-menu";
import Image from "next/image";

interface Props {
  className?: string;
  message: MessageDTO;
  isMe: boolean;
  onMessageDelete: () => void;
}

export const MessageItem: React.FC<Props> = ({
  className,
  message,
  isMe,
  onMessageDelete,
}) => {
  const date = new Date(message.createdAt);
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={cn(
          className,
          "p-3 min-w-60 border rounded-3xl max-w-2/3 relative",
          {
            "rounded-br-none bg-blue-50 self-end dark:bg-blue-900": isMe,
            "rounded-bl-none bg-white self-start dark:bg-[#363b45]": !isMe,
          },
        )}
      >
        <div className='flex items-center mb-2'>
          <Image
            alt='avatar'
            width={40}
            height={40}
            src={message.user.imageUrl || defaultAvatar.src}
            className='rounded-full mr-2'
          />
          {message.user.username}
        </div>
        <div className='text-justify wrap-break-word whitespace-pre-wrap'>
          {message.content}
        </div>
        <div className='opacity-60 select-none flex justify-end items-center'>
          {message.edited && <div className='text-sm italic mr-2'>Изменено</div>}
          <div className="text-sm">
            {date.toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </ContextMenuTrigger>

      <MessageContextMenu
        isMe={isMe}
        messageId={message.id}
        onMessageDelete={onMessageDelete}
        content={message.content}
      />
    </ContextMenu>
  );
};
