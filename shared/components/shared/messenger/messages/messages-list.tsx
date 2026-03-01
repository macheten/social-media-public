import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { useMessagesStore } from "@src/store/messages";
import { useInfiniteScroll } from "@shared/lib/hooks/use-infinite-scroll";
import { MessageItem } from "./message-item";
import { MessageDTO } from "@mytypes/types";
import { DeleteMessageModal } from "../../modals/delete-message-modal";
import { useDeleteMessageModal } from "@shared/lib/hooks/use-delete-message-modal";
import { useChatPusher } from "@shared/lib/pusher/hooks/useChatPusher";
import { deleteMessage } from "@src/app/actions/chats/delete-message";
import { MessageSkeleton } from "@shared/components/skeletons/message-skeleton";
import { MessageCircleMore } from "lucide-react";

interface Props {
  className?: string;
  chatId: string;
  authorizedId: string;
}

export const MessagesList: React.FC<Props> = ({
  className,
  chatId,
  authorizedId,
}) => {
  const {
    messages,
    fetchMessages,
    hasNextPage,
    isFetching,
    nextCursor,
    resetState,
    addMessage,
    deleteMessage,
    editMessage,
  } = useMessagesStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const { close, isOpen, open, messageId } = useDeleteMessageModal();

  const onNewMessage = (data: MessageDTO) => {
    addMessage(data);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const onMessageDelete = (messageId: string) => {
    deleteMessage(messageId);
  };

  useChatPusher({
    chatId,
    onNewMessage,
    onMessageDelete,
    onMessageEdit(messageId, content) {
      editMessage(messageId, content);
    },
  });

  useEffect(() => {
    if (!nextCursor) {
      setInitialLoading(true);
      fetchMessages({ chatId, cursor: null }).then(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        setInitialLoading(false);
      });
    }

    return () => resetState();
  }, [chatId]);

  const loadMore = useCallback(async () => {
    if (initialLoading) return;
    await fetchMessages({
      chatId,
      cursor: nextCursor,
    });
  }, [nextCursor, chatId, initialLoading]);

  const { endOfPage } = useInfiniteScroll({
    fetching: isFetching,
    hasNextPage,
    loadMore,
  });

  return (
    <div
      ref={scrollRef}
      className={cn(
        "h-full px-4 space-y-4 overflow-y-auto flex flex-col-reverse relative",
      )}
    >
      <div className='flex flex-col'>
        {!initialLoading &&
          messages.map((m) => (
            <MessageItem
              onMessageDelete={() => open(m.id)}
              isMe={m.userId === authorizedId}
              className='mb-2'
              key={m.id}
              message={m}
            />
          ))}
      </div>
      <div className='py-2' ref={endOfPage} />
      <div>
        {initialLoading &&
          [...Array(3)].map((_, i) => (
            <MessageSkeleton
              key={i}
              className={cn("mb-2 justify-self-end", {
                "justify-self-start": i === 2,
              })}
            />
          ))}
      </div>

      <DeleteMessageModal
        messageId={messageId!}
        isOpen={isOpen}
        onClose={close}
      />

      {!initialLoading && messages.length === 0 && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>

            <MessageCircleMore className="mb-2" size={30} />
          <div>Пока нет сообщений</div>
        </div>
      )}
    </div>
  );
};
