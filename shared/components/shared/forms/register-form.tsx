import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { registerSchema } from "@shared/schemas/forms/auth-schemas";
import { Field, Form, Formik } from "formik";
import { UserPen } from "lucide-react";
import React, { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ValidationMessage } from "../validation-message";
import { register } from "@src/app/actions/auth/register";
import toast from "react-hot-toast";

export const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (data: typeof initialValues) => {
    try {
      setLoading(true)
      const res = await register(data);

      if (res.success) {
        toast.success(res.message, {
          duration: 4000,
        });
      } else {
        toast.error(res.message, {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Что-то пошло не так. Попробуйте снова", {
        duration: 4000,
      });
      console.error(error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      <Form>
        <div className='flex flex-col'>
          <div className='flex flex-col mb-5'>
            <Field
              name='username'
              placeholder='Имя пользователя'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='username' />
            <Field
              name='email'
              placeholder='Введите почту'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='email' />
            <Field
              name='password'
              placeholder='Введите пароль'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='password' />
            <Field
              name='confirmPassword'
              placeholder='Подтверждение пароля'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='confirmPassword' />
          </div>

          <Button loading={loading} type='submit' className='self-center w-1/2' size={"lg"}>
            Зарегистрироваться
            <UserPen />
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
