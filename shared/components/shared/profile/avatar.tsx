"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import defaultAvatar from "@publicfiles/images/default-avatar.webp";
import { ChangeAvatarModal } from "../modals/avatar-modal";
import { useProfileStore } from "@src/store/profile-state";

interface Props {
  className?: string;
  size?: number;
  isProfileOwner: boolean;
}

export const Avatar: React.FC<Props> = ({
  className,
  isProfileOwner,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const imageUrl = useProfileStore((state) => state.profile.imageUrl);

  const onImageClick = () => {
    if (isProfileOwner) {
      setOpenModal(true);
    }
  };

  return (
    <div
      className={cn(
        className,
        `rounded-full border shadow mr-5 overflow-hidden shrink-0`,
        { "cursor-pointer": isProfileOwner },
      )}
    >
      <img
        className="h-[50px] w-[50px] sm:h-[80px] sm:w-[80px] md:h-[150px] md:w-[150px] object-cover"
        onClick={onImageClick}
        alt='аватарка'
        src={imageUrl || defaultAvatar.src}
      />
      {isProfileOwner && (
        <ChangeAvatarModal
          onClose={() => setOpenModal(false)}
          open={openModal}
        />
      )}
    </div>
  );
};
