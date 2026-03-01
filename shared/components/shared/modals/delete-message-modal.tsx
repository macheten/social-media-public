import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { Trash, Undo2 } from "lucide-react";
import { deleteMessage } from "@src/app/actions/chats/delete-message";
import { useMessagesStore } from "@src/store/messages";

interface Props {
  isOpen: boolean;
  messageId: string
  onClose: () => void;
}

export const DeleteMessageModal: React.FC<Props> = ({
  isOpen,
  onClose,
  messageId
}) => {
  const [checked, setChecked] = useState(true);
  const deleteMessageFromStore = useMessagesStore(state => state.deleteMessage)
  const handleDelete = async () => {
    await deleteMessage({
      deleteForEveryone: checked,
      messageId
    })

    if (!checked) {
      deleteMessageFromStore(messageId)
    }
    onClose()
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center">
        <DialogTitle className='text-xl'>Удалить сообщение?</DialogTitle>
        <div>
          <div className='flex items-center mb-5'>
            <Checkbox
              className='mr-3 h-5 w-5'
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
              id='checkbox'
            />
            <Label className='text-lg' htmlFor='checkbox'>
              Удалить для всех
            </Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={onClose} variant={'outline'}>
                Отмена
                <Undo2 />
            </Button>
            <Button onClick={() => handleDelete()} className="border-none" variant={'destructive'}>
                Удалить
                <Trash />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
