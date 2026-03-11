import { FriendshipsList } from "@shared/components/shared/friends/friendships-list";
import { FriendsSections } from "@shared/components/shared/friends/friends-sections";
import { WhiteBlock } from "@shared/components/shared/white-block";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const VALID_SECTIONS = [
  'allFriends', 
  'incomingRequests', 
  'outcomingRequests'
] as const

export type FriendsSectionsType = typeof VALID_SECTIONS[number]

interface PageProps {
  searchParams: Promise<{
    section: FriendsSectionsType
  }>
}

export default async function FriendsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/unauthorized")
  }
  
  const { section } = await searchParams

  if (!VALID_SECTIONS.includes(section)) {
    return <div>страница не существует</div>
  }
  
  return (
    <div className='flex justify-between not-sm:flex-col-reverse relative'>
      <WhiteBlock className='p-2 sm:mr-2 flex-8'>
        <FriendshipsList section={section} />
      </WhiteBlock>

      <WhiteBlock className='px-2 py-1 sticky top-[70px] not-sm:mb-2 not-sm:shadow self-start flex-2 w-full'>
        <FriendsSections selectedSection={section} />
      </WhiteBlock>
    </div>
  );
}
