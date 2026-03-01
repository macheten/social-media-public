import React from "react";
import { cn } from "@shared/lib/utils";
import Link from "next/link";
import defaultAvatar from "@publicfiles/images/default-avatar.webp";
import { Chat } from "@prisma/client";

interface Props {
  className?: string;
  chat: Chat;
  isActive: boolean
}

export const ChatItem: React.FC<Props> = ({ className, chat, isActive }) => {
  return (
    <Link
      title={chat.title || ""}
      className={cn(className, 'rounded-2xl overflow-clip')}
      href={"/messenger?chatId=" + chat.id}
    >
      <div className={cn('flex p-2 transition-all hover:bg-gray-100 dark:hover:bg-[#ffffff26] dark:border',
        {
          'bg-gray-200 hover:bg-gray-200': isActive
        }
      )}>
        <img
          src={chat.imageUrl || defaultAvatar.src}
          alt='avatar'
          className='rounded-full mr-2'
          width={50}
          height={50}
        /> {/* text-primary */}
        <div className={cn('max-w-full overflow-hidden text-ellipsis whitespace-nowrap', 
          {
            'text-primary': isActive
          }
        )}>
          {chat.title}
        </div>
      </div>
    </Link>
  );
};
