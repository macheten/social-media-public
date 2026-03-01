import { CommentDTO } from "@mytypes/types"
import { axiosInstance } from "./instance"

export interface FetchCommentsProps {
    postId: string
    cursor: string | null
}

export interface FetchCommentsResp {
    comments: CommentDTO[]
    nextCursor: string | null
    hasNextPage: boolean
}

export const fetchComments = async ({ cursor, postId }: FetchCommentsProps): Promise<FetchCommentsResp> => {
    const cursorQuery = cursor ? `&cursor=${cursor}` : ''
    const { data } = await axiosInstance.get(`/comments?postId=${postId}${cursorQuery}`)
    return data
}