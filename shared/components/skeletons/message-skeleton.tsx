import React from "react";
import { cn } from "@shared/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const MessageSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className='flex items-center mb-2'>
        <Skeleton className='rounded-full w-10 h-10 mr-2' />
        <Skeleton className='h-3 w-10' />
      </div>
      <div>
        <Skeleton className="w-50 h-2 mb-1"/>
        <Skeleton className="w-45 h-2 mb-1"/>
        <Skeleton className="w-40 h-2 mb-1"/>
      </div>
    </div>
  );
};
