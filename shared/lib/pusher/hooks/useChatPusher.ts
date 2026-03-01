import { MessageDTO } from "@mytypes/types";
import Pusher from "pusher-js";
import { useEffect } from "react";

interface UseChatPusherProps {
  chatId: string;
  onNewMessage: (data: MessageDTO) => void;
  onMessageDelete: (deletedId: string) => void;
  onMessageEdit: (messageId: string, content: string) => void
}

export const useChatPusher = ({
  chatId,
  onNewMessage,
  onMessageDelete,
  onMessageEdit
}: UseChatPusherProps) => {
  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: "eu",
        channelAuthorization: {
          endpoint: "/api/pusher-auth",
          transport: "ajax",
        },
      },
    );
    const channel = pusher.subscribe(`private-chat-${chatId}`);

    channel.bind("new-message", (data: MessageDTO) => {
      onNewMessage(data);
    });

    channel.bind("delete-message-for-all", (deletedId: string) => {
      onMessageDelete(deletedId);
    });

    channel.bind("edit-message", (data: {messageId: string, content: string}) => {
      onMessageEdit(data.messageId, data.content)
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [chatId]);
};
