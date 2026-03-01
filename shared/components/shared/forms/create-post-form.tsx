'use client';

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { ValidationMessage } from "../validation-message";
import {
  createPost,
  CreatePostProps,
} from "@src/app/actions/profile/create-post";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createPostSchema } from "@shared/schemas/forms/profile-schemas";
import toast from "react-hot-toast";
import { usePostStore } from "@src/store/posts-state";

interface Props {
  onAdd: () => void
}

export const CreatePostForm: React.FC<Props> = ({ onAdd }) => {
  const [loading, setLoading] = useState(false);
  const addPost = usePostStore(state => state.addPost)
  const initialValues: CreatePostProps = {
    title: "",
    content: "",
  };

  const onSubmit = async (data: typeof initialValues) => {
    try {
      setLoading(true);
      await addPost(data);
      onAdd()
      toast.success("Пост добавлен вам на страницу");
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(createPostSchema)}
      validateOnBlur={false}
    >
      <Form>
        <div className='mb-5'>
          <div className='mb-3'>
            <Field name='title' placeholder='Заголовок' as={Input} className='mb-1'/>
            <ValidationMessage name='title' />
          </div>

          <div>
            <Field name='content' placeholder='Текст поста' as={Textarea}
            className='mb-1 h-50 resize-none'
            />
            <ValidationMessage name='content' />
          </div>
        </div>

        <Button loading={loading} className="w-21.75" type='submit'>
          Создать
        </Button>
      </Form>
    </Formik>
  );
};
