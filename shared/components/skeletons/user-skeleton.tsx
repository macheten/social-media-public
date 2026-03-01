import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@shared/lib/utils";

interface Props {
  className?: string;
}

export const UserSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "flex justify-between items-center")}>
      <div className='flex items-center'>
        <Skeleton className='rounded-full mr-5 w-20 h-20' />
        <Skeleton className='w-20 h-7' />
      </div>

      <div>
        <Skeleton className='w-22 h-8' />
      </div>
    </div>
  );
};
