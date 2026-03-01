"use client";

import React, { useRef } from "react";
import { cn } from "@shared/lib/utils";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { usePeopleStore } from "@src/store/people-state";

interface Props {
  onSubmit: () => void
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className, onSubmit }) => {
  const setNameQuery = usePeopleStore(state => state.setNameQuery)
  const nameQuery = usePeopleStore(state => state.nameQuery)

  return (
    <div className={cn(className, "flex items-center transform-border")}>
      <Input
        value={nameQuery}
        className='p-5'
        placeholder='Поиск по имени...'
        onChange={(e) => setNameQuery(e.currentTarget.value)}
      />

      {/* {nameQuery && ( */}
        <div className="ml-5">
          <Button onClick={() => onSubmit()} size={'lg'} className="text-md">
            Найти
          </Button>
        </div>
      {/* )} */}
    </div>
  );
};
