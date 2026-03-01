"use client";

import { useEditMessageStore } from "@src/store/edit-message";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@ui/button";
import { Check, Pencil, X } from "lucide-react";
import { Textarea } from "@ui/textarea";
import { editMessage } from "@src/app/actions/chats/edit-message";
import toast from "react-hot-toast";

export const EditMessageForm: React.FC = () => {
  const { editContent, quitEditMode, setEditContent, messageId } = useEditMessageStore();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      await editMessage({ content: editContent, messageId })
      quitEditMode()
    } catch (error) {
      toast.error('Что-то пошло не так')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        quitEditMode();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const textarea = ref.current!;
      textarea.focus();
      const textLength = textarea.value.length;
      textarea.setSelectionRange(textLength, textLength);
    }, 0);
  })


  return (
    <div className='p-3 relative'>
      <div className='flex border rounded-t-lg rounded-b p-2 bg-accent opacity-80 items-center justify-between absolute top-0 left-0 right-0 -translate-y-full'>
        <div className='flex items-center'>
          <Pencil size={20} className='text-primary mr-2' />
          <span className='text-sm italic select-none'>Редактирование...</span>
        </div>

        <Button variant={"outline"} onClick={quitEditMode} size={"icon-sm"}>
          <X />
        </Button>
      </div>
      <div className='flex items-center h-full'>
        <Textarea
          ref={ref}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          name='editContent'
          className='resize-none h-25'
          placeholder='Новое сообщение...'
        />
        <Button
          loading={loading}
          onClick={onSubmit}
          type='submit'
          className='h-full w-15 ml-2'
        >
          <Check />
        </Button>
      </div>
    </div>
  );
};
