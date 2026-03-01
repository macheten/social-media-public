import React from "react";
import { WhiteBlock } from "../white-block";
import { Plus } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface Props {
    className?: string
}

export const AddPostBtn: React.FC<Props> = ({className}) => {
  return (
    <WhiteBlock
      className={cn(className, 'flex justify-center p-2.5 cursor-pointer')}
    >
      <Plus className='mr-1' color='var(--primary)' />
      <span className='font-medium'>Добавить пост</span>
    </WhiteBlock>
  );
};
