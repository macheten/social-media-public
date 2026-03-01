import { DeleteFriendMenu } from "@shared/components/shared/friends/delete-friend-menu";
import { CommentSkeleton } from "@shared/components/skeletons/comment-skeleton";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <Link href={"/comments/123"}>show comments</Link> */}
      {/* <DeleteFriendMenu /> */}
      <CommentSkeleton />
    </div>
  );
}
