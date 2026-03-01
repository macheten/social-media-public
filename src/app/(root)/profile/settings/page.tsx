import { ProfileForm } from "@shared/components/shared/forms/profile-form";
import { WhiteBlock } from "@shared/components/shared/white-block";
import { authOptions } from "@src/app/api/auth/[...nextauth]/route";
import { Api } from "@src/services";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)
  console.log(session)
  
  if (!session) {
    return redirect('/')
  }
  const res = await Api.user.fetchProfile(session.user.id)

  return <div>
    <WhiteBlock className="p-4">
      <ProfileForm profile={res.profile} />
    </WhiteBlock>
  </div>;
};
