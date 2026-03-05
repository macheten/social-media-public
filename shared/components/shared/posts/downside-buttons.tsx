import React from 'react';
import { cn } from '@shared/lib/utils';

interface Props {
    className?: string;
}

export const DownsideButtons: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}></div>
  );
};