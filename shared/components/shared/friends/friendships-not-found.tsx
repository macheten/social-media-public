import { FriendsSectionsType } from "@src/app/(root)/friends/page";
import { ArrowRight, Users, X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  section: FriendsSectionsType;
}

export const FriendshipsNotFound: React.FC<Props> = ({ section }) => {
  if (section === "incomingRequests" || section === "outcomingRequests") {
    return <div className="text-2xl flex flex-col items-center">
        <X size={40} className="text-red-600" />
        <div className="my-4">Пока нет заявок</div>
        <Link className='text-primary flex items-center text-xl' href={"/search"}>
          Найти друзей
          <ArrowRight className='ml-2' />
        </Link>
    </div>;
  }

  if (section === "allFriends") {
    return (
      <div className='flex flex-col items-center text-2xl'>
        <Users size={40} className='opacity-70' />
        <div className='my-4'>Друзья не найдены</div>
        <Link className='text-primary flex items-center' href={"/search"}>
          Поиск
          <ArrowRight className='ml-2' />
        </Link>
      </div>
    );
  }
};
