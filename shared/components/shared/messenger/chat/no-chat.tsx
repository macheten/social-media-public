import React from "react";
import { cn } from "@shared/lib/utils";
import { MessagesSquare } from "lucide-react";
import { useCreateChatModal } from "@src/store/create-chat-modal";

interface Props {
  className?: string;
}

export const NoChat: React.FC<Props> = ({ className }) => {
  const { onOpen } = useCreateChatModal();
  return (
    <div className={cn(className, "flex flex-col items-center justify-center")}>
      <MessagesSquare size={50} className='opacity-70 mb-3' />
      <div className='text-xl opacity-90'>Выберите чат</div>
      <div className='text-xl opacity-90'>
        или{" "}
        <span
          onClick={onOpen}
          className='text-primary cursor-pointer'
        >
          создайте новый
        </span>
      </div>
    </div>
  );
};
