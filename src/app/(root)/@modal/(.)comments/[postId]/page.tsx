import { CommentsModal } from "@shared/components/shared/modals/comments-modal";

export default async function CommentsModalPage ({ params }: any) {
    const { postId } = await params

    return <CommentsModal postId={postId} />
}