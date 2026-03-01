import React from "react";
import { Skeleton } from "../ui/skeleton";

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <Skeleton className='rounded-full h-37 w-37 mr-5' />

        <div>
          <Skeleton className='w-40 h-6 mb-2' />
          <Skeleton className='w-30 h-3.5 mb-2' />
          <Skeleton className='w-30 h-3.5' />
        </div>
      </div>

      <Skeleton className='w-44.25 h-9' />
    </div>
  );
};
