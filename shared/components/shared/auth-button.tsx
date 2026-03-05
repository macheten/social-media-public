"use client";

import React from "react";
import { Button } from "@shared/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@shared/lib/utils";

interface Props {
  className?: string;
  onClick: () => void;
}

export const AuthButton: React.FC<Props> = ({ className, onClick }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Button loading className='w-27' />;
  }

  return (
    <>
      {session?.user ? (
        <>
          <Link href={"/profile"}>
            <Button>
              <User />
              Профиль
            </Button>
          </Link>
          <Button
            className='not-md:hidden'
            onClick={() => signOut()}
            variant={"outline"}
          >
            <LogOut />
            Выйти
          </Button>
        </>
      ) : (
        <Button onClick={onClick}>
          <LogIn />
          Войти
        </Button>
      )}
    </>
  );
};
