"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import React, { useState } from "react";
import { LoginForm } from "../../forms/login-form";
import { RegisterForm } from "../../forms/register-form";
import { ToggleFormType } from "./toggle-form-type";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Авторизация</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <ToggleFormType
            isLoginForm={isLoginForm}
            setIsLoginForm={setIsLoginForm}
          />
          {isLoginForm ? <LoginForm closeModal={onClose} /> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
