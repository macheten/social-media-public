"use client";

import React from "react";
import { Button } from "@shared/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface Props {
  className?: string;
  onClick: () => void;
}

export const AuthButton: React.FC<Props> = ({ className, onClick }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button loading className='mr-2 w-27' />;
  }

  return (
    <>
      {session?.user ? (
        <div>
          <Link href={"/profile"}>
            <Button className='mr-2'>
              <User />
              Профиль
            </Button>
          </Link>
          <Button onClick={() => signOut()} variant={'outline'}>
            <LogOut  />
            Выйти
          </Button>
        </div>
      ) : (
        <Button onClick={onClick}>
          <LogIn />
          Войти
        </Button>
      )}
    </>
  );
};
