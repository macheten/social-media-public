import React from "react";
import { cn } from "@shared/lib/utils";
import { PersonDTO } from "@mytypes/types";
import defaultProfilePicture from "@publicfiles/images/default-avatar.webp";
import Link from "next/link";
import { Button } from "../../ui/button";

interface Props extends PersonDTO {
  className?: string;
}

export const PersonItem: React.FC<Props> = ({
  className,
  id,
  imageUrl,
  username,
}) => {
  return (
    <div className={cn(className)}>
      <div className='flex justify-between items-center'>
        <div className="flex items-center">
          <Link href={`/profile?userId=${id}`} className="mr-5">
            <img
              height={80}
              width={80}
              className='rounded-full'
              src={imageUrl || defaultProfilePicture.src}
              alt='avatar'
            />
          </Link>
          <div className='text-xl'>{username}</div>
        </div>

        <div>
          <Button variant={'outline'} size={"sm"}>Добавить</Button>
        </div>
      </div>
    </div>
  );
};
