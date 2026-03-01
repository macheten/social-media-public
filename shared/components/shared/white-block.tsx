import React, { PropsWithChildren } from 'react';
import { cn } from '@shared/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const WhiteBlock: React.FC<PropsWithChildren<Props>> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className, 'bg-gray-50 dark:bg-accent rounded-2xl border')} {...props} >
        {children}
    </div>
  );
};