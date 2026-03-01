import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  about: string
  isProfileOwner: boolean
}

export const AboutInfo: React.FC<Props> = ({ className, about, isProfileOwner }) => {
  return (
    <div className={className}>
      {!about ? (
        isProfileOwner && (
          <Link href={"/profile/settings"} className='flex group'>
            <span className='mr-2 text-primary font-mono'>Написать о себе</span>
            <ArrowRight color='#7f22fe' strokeWidth={1} />
          </Link>
        )
      ) : (
        <div>
          <div className='text-black font-mono'>{about}</div>
        </div>
      )}
    </div>
  );
};
