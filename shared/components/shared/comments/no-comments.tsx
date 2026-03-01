import React from 'react';
import { cn } from '@shared/lib/utils';
import { MessageCircleMore } from 'lucide-react';

interface Props {
    className?: string;
}

export const NoComments: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'flex flex-col items-center justify-center ')}>
        <MessageCircleMore className='opacity-70' size={30} />
        <div className='text-lg opacity-70'>Пока нет комментариев</div>
    </div>
  );
};