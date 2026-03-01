import React, { PropsWithChildren } from 'react';
import { cn } from '@shared/lib/utils';

interface Props {
    className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn(className, 'max-w-6xl mx-auto')}>
        {children}
    </div>
  );
};