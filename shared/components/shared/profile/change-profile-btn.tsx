import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";

export const ChangeProfileBtn: React.FC = () => {
  return (
    <Link href={"/profile/settings"}>
      <Button variant={"outline"}>
        <Pencil />
        <span className="hidden sm:block">Изменить профиль</span>
      </Button>
    </Link>
  );
};
