import React from "react";
import { cn } from "@shared/lib/utils";
import { NavLink } from "./nav-link";
import { Home, MessageCircle, Search, User, Users } from "lucide-react";

interface Props {
  className?: string;
  onClick?: () => void
}

export const Navigation: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={cn(className, "")}>
        <NavLink onClick={onClick} href="/" text="Главная" Icon={Home} />
        <NavLink onClick={onClick} href="/profile" text="Профиль" Icon={User} />
        <NavLink onClick={onClick} href="/messenger" text="Сообщения" Icon={MessageCircle} />
        <NavLink onClick={onClick} href="/search" text="Поиск" Icon={Search} />
        <NavLink onClick={onClick} href="/friends?section=allFriends" text="Друзья" Icon={Users} />
    </div>
  );
};
