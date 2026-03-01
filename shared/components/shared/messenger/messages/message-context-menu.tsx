import React from "react";
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
} from "@shared/components/ui/context-menu";
import { Copy, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useEditMessageStore } from "@src/store/edit-message";

interface Props {
  className?: string;
  content: string;
  messageId: string
  isMe: boolean
  onMessageDelete: () => void;
}

export const MessageContextMenu: React.FC<Props> = ({
  className,
  content,
  isMe,
  messageId,
  onMessageDelete,
}) => {
    const beginEditMode = useEditMessageStore((state) => state.beginEditMode);
  const handleEdit = () => {
    beginEditMode(messageId, content)
  }
  return (
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuItem
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Текст скопирован");
          }}
          className='flex justify-between'
        >
          Копировать <Copy />
        </ContextMenuItem>

        {isMe && <ContextMenuItem onClick={handleEdit} className='flex justify-between'>
          Изменить <Pencil />
        </ContextMenuItem>}

        <ContextMenuItem
          onClick={onMessageDelete}
          variant='destructive'
          className='flex justify-between hover:bg-red-300'
        >
          Удалить <Trash />
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
};
