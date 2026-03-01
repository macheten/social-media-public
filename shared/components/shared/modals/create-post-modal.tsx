'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { CreatePostForm } from "../forms/create-post-form";
import { AddPostBtn } from "../profile/add-post-btn";

export const CreatePostModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={e => setOpen(e)}>
      <DialogTrigger className="w-full">
        <AddPostBtn />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle hidden title='создать пост' />
        <div>
          <h1 className='text-2xl mb-5'>Создание поста</h1>

          <CreatePostForm onAdd={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
