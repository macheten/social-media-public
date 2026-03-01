"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@shared/lib/utils";
import { ResizablePanel } from "@shared/components/ui/resizable";
import { useChatsStore } from "@src/store/chats";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { ChatItem } from "./chat-item";
import { ChatListMenu } from "./chat-list-menu";
import { ChatSkeleton } from "@shared/components/skeletons/chat-skeleton";
import { CreateChatModal } from "../../modals/create-chat-modal";
import { useCreateChatModal } from "@src/store/create-chat-modal";
import Pusher from "pusher-js";
import { Chat } from "@prisma/client";
import { ScrollArea } from "@shared/components/ui/scroll-area";

interface Props {
  className?: string;
  authorizedId: string;
}

export const ChatListPanel: React.FC<Props> = ({ className, authorizedId }) => {
  const [chats, fetchChats, createChat] = useChatsStore(
    useShallow((state) => [state.chats, state.fetchChats, state.createChat]),
  );
  const [loading, setLoading] = useState(true);
  const { open, onClose } = useCreateChatModal();
  const currentChat = useChatsStore(state => state.currentChat)

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: "eu",
        channelAuthorization: {
          endpoint: "/api/pusher-auth/user",
          transport: "ajax",
        },
      },
    );

    const channel = pusher.subscribe(`private-user-${authorizedId}`);
    channel.bind("new-chat", (chat: Chat) => {
      createChat(chat);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchChats().then(() => setLoading(false));
  }, []);

  return (
    <div className={cn(className, 'flex flex-col h-full')}>
      <CreateChatModal open={open} onClose={onClose} />
      <ChatListMenu className='mb-2' />
      {loading ? (
        [...Array(5)].map((_, i) => <ChatSkeleton key={i} />)
      ) : (
        <ScrollArea className='flex-1 overflow-y-auto px-2 -ml-2'>
          <div className='p-1'>
          {chats.map((c) => (
            <ChatItem
            isActive={currentChat?.id === c.id}
              className='text-ellipsis mb-1 block'
              chat={c}
              key={c.id}
            />
          ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
