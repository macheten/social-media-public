"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Textarea } from "../../ui/textarea";
import { ValidationMessage } from "../validation-message";
import { useCommentsState } from "@src/store/comments-state";
import { cn } from "@shared/lib/utils";
import { Button } from "../../ui/button";
import { Send } from "lucide-react";

interface Props {
  postId: string;
  className?: string;
}

export const CreateCommentForm: React.FC<Props> = ({ postId, className }) => {
  const initialValues = {
    content: "",
  };
  const [loading, setLoading] = useState(false);
  const createComment = useCommentsState((state) => state.createComment);

  const onSubmit = async (data: typeof initialValues, { resetForm }: any) => {
    setLoading(true);
    await createComment({ content: data.content, postId });
    resetForm();
    setLoading(false);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={cn(className)}>
        <div className='flex'>
          <div className='flex-1 mr-2'>
            <Field
              disabled={loading}
              className='bg-white resize-none shadow-none disabled:cursor-progress'
              name='content'
              placeholder='Введите комментарий...'
              as={Textarea}
            />
            <ValidationMessage name='content' />
          </div>
          <div>
            <Button loading={loading} className='w-13 h-full'>
              <Send />
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
