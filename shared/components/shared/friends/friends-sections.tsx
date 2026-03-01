import React from "react";
import Link from "next/link";
import { cn } from "@shared/lib/utils";
import { FriendsSectionsType } from "@src/app/(root)/friends/page";

interface Props {
  selectedSection: FriendsSectionsType
}

export const FriendsSections: React.FC<Props> = ({selectedSection}) => {
  return (
    <div className='flex flex-col gap-1'>
      <Link
        href={"/friends?section=allFriends"}
        className={cn('p-2 rounded-lg hover:bg-gray-100 transition-all', {
          "bg-gray-200 hover:bg-gray-200": selectedSection === "allFriends"
        })}
      >
        Друзья
      </Link>
      <Link
        href={"/friends?section=incomingRequests"}
        className={cn('p-2 rounded-lg hover:bg-gray-100 transition-all', {
          "bg-gray-200 hover:bg-gray-200": selectedSection === "incomingRequests"
        })}
      >
        Входящие заявки
      </Link>
      <Link
        href={"/friends?section=outcomingRequests"}
        className={cn('p-2 rounded-lg hover:bg-gray-100 transition-all', {
          "bg-gray-200 hover:bg-gray-200": selectedSection === 'outcomingRequests'
        })}
      >
        Исходящие заявки
      </Link>
    </div>
  );
};
