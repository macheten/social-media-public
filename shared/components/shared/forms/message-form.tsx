import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Loader, Send } from "lucide-react";
import { createMessage } from "@src/app/actions/chats/create-message";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createMessageSchema } from "@shared/schemas/forms/messenger-schemas";

interface Props {
  chatId: string;
}

export const MessageForm: React.FC<Props> = ({ chatId }) => {
  const initialValues = {
    content: "",
  };
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: typeof initialValues, { resetForm }: any) => {
    setLoading(true);
    await createMessage({
      chatId,
      content: data.content,
    });
    setLoading(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(createMessageSchema)}
      validateOnChange={true}
    >
      {({ dirty, isValid }) => (
        <Form className='p-3 border-t'>
          <div className='flex items-center h-full'>
            <Field
              name='content'
              as={Textarea}
              className='resize-none h-25'
              placeholder='Сообщение...'
            />
            <Button
              loading={loading}
              disabled={!isValid || !dirty || loading}
              type='submit'
              className='h-full w-15 ml-2'
            >
              <Send />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
