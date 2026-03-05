import React from "react";
import { cn } from "@shared/lib/utils";
import { NavLink } from "./nav-link";
import { Home, MessageCircle, Search, User, Users } from "lucide-react";

interface Props {
  className?: string;
}

export const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "")}>
        <NavLink href="/" text="Главная" Icon={Home} />
        <NavLink href="/profile" text="Профиль" Icon={User} />
        <NavLink href="/messenger" text="Сообщения" Icon={MessageCircle} />
        <NavLink href="/search" text="Поиск" Icon={Search} />
        <NavLink href="/friends?section=allFriends" text="Друзья" Icon={Users} />
    </div>
  );
};
