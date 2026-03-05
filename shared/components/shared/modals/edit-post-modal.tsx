"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { EditPostForm, EditPostInitialValues } from "../forms/edit-post-form";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";
import { UpdatePostProps } from "@src/app/actions/profile/update-post";

interface Props extends EditPostInitialValues {
  open: boolean
  onClose: () => void
  postId: string;
  onEdit: ({}: UpdatePostProps) => Promise<void>;
}

export const EditPostModal: React.FC<Props> = ({
  postId,
  onEdit,
  onClose,
  open,
  ...props
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle hidden title='Изменить пост' />
        <div>
          <h1 className='text-2xl mb-3'>Изменить пост</h1>

          <EditPostForm
            onEdit={onEdit}
            closeModal={onClose}
            postId={postId}
            {...props}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
