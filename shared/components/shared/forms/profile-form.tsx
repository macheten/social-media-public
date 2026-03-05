"use client";

import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Save, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserDTO } from "@mytypes/types";
import { Textarea } from "../../ui/textarea";
import {
  updateProfile,
  UpdateProfileProps,
} from "@src/app/actions/profile/update-profile";
import toast from "react-hot-toast";
import { Avatar } from "../profile/avatar";

interface Props {
  profile: UserDTO;
}

export const ProfileForm: React.FC<Props> = ({ profile }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues: UpdateProfileProps = {
    about: profile.about,
    username: profile.username,
  };

  const onSubmit = async (data: UpdateProfileProps) => {
    try {
      setLoading(true);
      const res = await updateProfile(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <div className='max-w-125 mb-5'>
          <div className="inline-block">
            <Avatar isProfileOwner={true} size={100} className="mb-5" />
          </div>
          <div className='mb-2'>
            <Label className='mb-1 text-md' htmlFor='username'>
              Имя пользователя
            </Label>
            <Field
              placeholder='Введите имя'
              id='username'
              name='username'
              as={Input}
            />
          </div>

          <div className='mb-2'>
            <Label className='mb-1 text-md' htmlFor='about'>
              О себе
            </Label>
            <Field
              placeholder='Расскажите о себе'
              id='about'
              name='about'
              as={Textarea}
            />
          </div>
        </div>

        <Button
          loading={loading}
          className='mr-3 w-30'
          type='submit'
        >
          <Save />
          Сохранить
        </Button>
        <Button
          className='w-30'
          loading={loading}
          onClick={() => router.push("/profile")}
          variant={"outline"}
          type='button'
        >
          <Undo2 />
          Назад
        </Button>
      </Form>
    </Formik>
  );
};
