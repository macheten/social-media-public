import React from 'react';
import { cn } from '@shared/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface Props {
    className?: string;
}

export const CommentSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'p-2')}>
      <div className='flex items-center mb-2'>
        <Skeleton className='mr-3 w-10 h-10 rounded-full' />
        <Skeleton className='w-20 h-4' />
      </div>
      <Skeleton className='w-60 h-2 mb-2' />
      <Skeleton className='w-55 h-2 mb-2' />
      <Skeleton className='w-50 h-2 mb-2' />
    </div>
  );
};