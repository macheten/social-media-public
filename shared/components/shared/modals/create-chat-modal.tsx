import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { FriendshipsList } from "../friends/friendships-list";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateChatModal: React.FC<Props> = ({ onClose, open }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <DialogTitle className="mb-4">Создание чата</DialogTitle>
          <div className="h-100 overflow-y-auto">
            <FriendshipsList onClickWrite={onClose} section="allFriends" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
