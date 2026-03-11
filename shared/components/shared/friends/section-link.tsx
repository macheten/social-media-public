import { cn } from "@shared/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  text: string;
  selected: boolean;
}

export const SectionLink: React.FC<Props> = ({ name, text, selected }) => {
  return (
    <Link
      href={`/friends?section=${name}`}
      className={cn("p-2 rounded-lg hover:bg-gray-100 transition-all flex-1", {
        "bg-gray-200 hover:bg-gray-200": selected,
      })}
    >
      {text}
    </Link>
  );
};
