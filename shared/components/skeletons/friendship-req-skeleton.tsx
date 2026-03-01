import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export const FriendshipReqSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className='flex justify-between items-center py-3 px-5'>
      <div className='flex items-center'>
        <Skeleton className='w-20 h-20 rounded-full mr-3' />
        <div className='flex flex-col gap-2'>
          <Skeleton className="w-30 h-5 rounded" />
        </div>
      </div>

      <div>
        <Skeleton className="w-30 h-8" />
      </div>
    </div>
  );
};
