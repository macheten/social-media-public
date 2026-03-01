"use client";

import React from "react";
import { cn } from "@shared/lib/utils";
import { ProfileSkeleton } from "../../skeletons/profile-skeleton";
import { WhiteBlock } from "../white-block";
import { Avatar } from "./avatar";
import { useProfile } from "@shared/lib/hooks/use-profile";
import { AddFriendButton } from "./add-friend-button";
import { AboutInfo } from "./about-info";
import { ChangeProfileBtn } from "./change-profile-btn";
import { Friendship } from "@prisma/client";

interface Props {
  className?: string;
  userId: string;
  isProfileOwner: boolean;
}

export const ProfileInfo: React.FC<Props> = ({
  className,
  userId,
  isProfileOwner,
}) => {
  const { profile, loading, friendshipExists, setFriendshipExists } =
    useProfile(userId);
  const handleAddFriend = (friendship: Friendship) => {
    setFriendshipExists(friendship);
  };

  return (
    <div className={cn(className)}>
      <WhiteBlock className='px-8 py-4'>
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <div className='flex justify-between'>
            <div className='flex items-start '>
              <Avatar isProfileOwner={isProfileOwner} size={150} />
              <div className='inline-flex flex-col mb-0.5 max-w-62.5'>
                <div className='text-2xl font-bold'>{profile.username}</div>
                <AboutInfo
                  about={profile.about}
                  isProfileOwner={isProfileOwner}
                />
                {/* <div>{friendshipExists?.status || 'no friends'}</div> */}
              </div>
            </div>

            <div>
              {isProfileOwner ? (
                <ChangeProfileBtn />
              ) : (
                <AddFriendButton
                  username={profile.username}
                  onClickAddFriend={handleAddFriend}
                  friendshipExists={friendshipExists}
                  userId={userId}
                />
              )}
            </div>
          </div>
        )}
      </WhiteBlock>
    </div>
  );
};
