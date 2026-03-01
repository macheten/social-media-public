import { Field, Form, Formik } from "formik";
import React, { useDeferredValue, useState } from "react";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { ValidationMessage } from "../validation-message";
import { Input } from "../../ui/input";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createPostSchema } from "@shared/schemas/forms/profile-schemas";
import toast from "react-hot-toast";
import { usePostStore } from "@src/store/posts-state";
import { UpdatePostProps } from "@src/app/actions/profile/update-post";

export interface EditPostInitialValues {
  title: string;
  content: string;
}

interface Props extends EditPostInitialValues {
  postId: string;
  closeModal: () => void;
  onEdit: ({}: UpdatePostProps) => Promise<void>;
}

export const EditPostForm: React.FC<Props> = ({
  content,
  title,
  postId,
  onEdit,
  closeModal,
}) => {
  const [loading, setLoading] = useState(false);
  const initialValues: EditPostInitialValues = {
    content,
    title,
  };

  const onSubmit = async ({ content, title }: typeof initialValues) => {
    try {
      setLoading(true);
      await onEdit({
        content,
        postId,
        title,
      });
      closeModal();
      toast.success("Пост обновлён");
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
    >
      <Form>
        <div className='flex flex-col gap-3 mb-5'>
          <div>
            <Field
              name='title'
              placeholder='Заголовок'
              as={Input}
              className='mb-1'
            />
            <ValidationMessage name='title' />
          </div>

          <div>
            <Field
              name='content'
              placeholder='Текст поста'
              as={Textarea}
              className='mb-1 h-50 resize-none'
            />
            <ValidationMessage name='content' />
          </div>
        </div>

        <div className='flex gap-2'>
          <Button className="w-25.5" loading={loading} type='submit'>
            Сохранить
          </Button>
          <Button
          className="w-21"
            onClick={closeModal}
            loading={loading}
            type='button'
            variant={"outline"}
          >
            Отмена
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
