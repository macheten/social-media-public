import React from "react";
import { cn } from "@shared/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const ChatSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "flex p-2")}>
      <Skeleton className='w-12.5 h-12.5 rounded-full mr-2' />
      <Skeleton className='w-20 h-4 rounded' />
    </div>
  );
};
