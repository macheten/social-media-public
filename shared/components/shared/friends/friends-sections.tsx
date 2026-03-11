import React from "react";
import { FriendsSectionsType } from "@src/app/(root)/friends/page";
import { SectionLink } from "./section-link";

interface Props {
  selectedSection: FriendsSectionsType;
}

const sections = [
  { name: "allFriends", text: "Друзья" },
  { name: "incomingRequests", text: "Входящие заявки" },
  { name: "outcomingRequests", text: "Исходящие заявки" },
];

export const FriendsSections: React.FC<Props> = ({ selectedSection }) => {
  return (
    <div className='flex flex-col gap-1 not-sm:flex-row not-sm:text-center not-sm:items-center not-sm:justify-center'>
      {sections.map((s) => (
        <SectionLink
          key={s.name}
          name={s.name}
          selected={selectedSection === s.name}
          text={s.text}
        />
      ))}
    </div>
  );
};
