import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
  Icon: LucideIcon;
  onClick?: () => void
}

export const NavLink: React.FC<Props> = ({ href, Icon, text, onClick }) => {
  return (
    <Link onClick={onClick} href={href} className="flex dark:hover:bg-[#ffffff26] dark:hover:opacity-100 items-center hover:bg-gray-300 hover:opacity-80 rounded-md p-1 mb-1 transition-all ease-in-out">
      <Icon color='var(--primary)' size={22} className="mr-3" />
      <span className="text-md">{text}</span>
    </Link>
  );
};
