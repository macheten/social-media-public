import { ProfileInfo } from "@shared/components/shared/profile/profile-info";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { PostsList } from "@shared/components/shared/profile/posts-list";
import { CreatePostModal } from "@shared/components/shared/modals/create-post-modal";

interface PageProps {
  searchParams: Promise<{
    userId: string | undefined;
  }>;
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const { userId } = await searchParams;
  
  let profileId = null;
  let isProfileOwner = false;
  
  if (!session && !userId) {
    return redirect("/unauthorized");
  }

  if (session && userId) {
    profileId = userId;
  } else {
    profileId = session?.user.id || userId;
  }
  if (session) {
    isProfileOwner = (session.user.id === userId) || (!userId)
  }

  return (
    <div>
      <ProfileInfo
        className='mb-2'
        userId={profileId as string}
        isProfileOwner={isProfileOwner}
      />
      <div className='max-w-150'>
        {isProfileOwner && <CreatePostModal />}
        <PostsList
          className='mt-5'
          userId={profileId as string}
          isProfileOwner={isProfileOwner}
        />
      </div>
    </div>
  );
}
