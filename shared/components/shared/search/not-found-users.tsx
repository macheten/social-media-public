import React from 'react';
import { cn } from '@shared/lib/utils';
import { UserX } from 'lucide-react';

interface Props {
    className?: string;
}

export const NotFoundUsers: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'flex text-2xl opacity-70')}>
        <UserX size={30} className='mr-3' />
        пользователи не найдены
    </div>
  );
};