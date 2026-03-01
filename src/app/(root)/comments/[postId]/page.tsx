import { CommentsList } from "@shared/components/shared/comments/comments-list";
import { CommentsCount } from "@shared/components/shared/comments/comments-count";
import { SinglePost } from "@shared/components/shared/comments/single-post";
import { CreateCommentForm } from "@shared/components/shared/forms/create-comment-form";

interface Params {
  params: Promise<{
    postId: string;
  }>;
}

export default async function CommentsPage({ params }: Params) {
  const { postId } = await params;

  return (
    <div className='max-w-150'>
      <SinglePost
      postId={postId}
        className='mb-5'
      />
      <CommentsCount marginClassName="mb-2" />
      <CreateCommentForm className='mb-3' postId={postId} />
      <CommentsList postId={postId} />
    </div>
  );
}
