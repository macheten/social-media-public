import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/lib/utils";
import { LogIn, UserPen } from "lucide-react";
import React from "react";

interface Props {
    setIsLoginForm: (value: boolean) => void
    isLoginForm: boolean
}

export const ToggleFormType: React.FC<Props> = ({ isLoginForm, setIsLoginForm }) => {
  return (
    <div className='flex mb-5 self-center rounded-2xl overflow-hidden border'>
      <Button
        onClick={() => setIsLoginForm(true)}
        className={cn("w-40 rounded-none border-none transition-all", {
          "bg-gray-100": isLoginForm,
        })}
        variant={"outline"}
      >
        Вход
        <LogIn />
      </Button>
      <Button
        onClick={() => setIsLoginForm(false)}
        className={cn("w-40 rounded-none border-none transition-all", {
          "bg-gray-100": !isLoginForm,
        })}
        variant={"outline"}
      >
        Регистрация
        <UserPen />
      </Button>
    </div>
  );
};
