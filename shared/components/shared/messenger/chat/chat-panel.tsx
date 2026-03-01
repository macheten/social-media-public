"use client";

import React, { useEffect } from "react";
import { cn } from "@shared/lib/utils";
import { useChatsStore } from "@src/store/chats";
import { NoChat } from "./no-chat";
import { useShallow } from "zustand/react/shallow";
import { ChatPanelHeader } from "./chat-panel-header";
import { MessageForm } from "../../forms/message-form";
import { MessagesList } from "../messages/messages-list";
import { useEditMessageStore } from "@src/store/edit-message";
import { EditMessageForm } from "../../forms/edit-message-form";

interface Props {
  className?: string;
  chatId: string | undefined;
  authorizedId: string;
}

export const ChatPanel: React.FC<Props> = ({
  className,
  chatId,
  authorizedId,
}) => {
  const [currentChat, fetchChatById] = useChatsStore(
    useShallow((state) => [state.currentChat, state.fetchChatById]),
  );
  const editMode = useEditMessageStore((state) => state.editMode);

  useEffect(() => {
    fetchChatById(chatId || "");
  }, [chatId]);

  return (
    <div className={cn(className, "h-[calc(100vh-88px)]")}>
      {currentChat && chatId ? (
        <>
          <div className='h-full grid grid-rows-[auto_1fr_auto]'>
            <ChatPanelHeader authorizedId={authorizedId} chat={currentChat} />
            <MessagesList authorizedId={authorizedId} chatId={chatId} />

            {editMode ? <EditMessageForm /> : <MessageForm chatId={chatId} />}
          </div>
        </>
      ) : (
        <div className='h-full flex items-center justify-center'>
          <NoChat />
        </div>
      )}
    </div>
  );
};
