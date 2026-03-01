import { Post } from "@prisma/client"
import { axiosInstance } from "./instance"
import { PostDTO } from "@mytypes/types"

export interface FetchPostsProps {
    userId: string
    cursor: string | null
}

interface FetchPostsResp {
    posts: PostDTO[]
    hasNextPage: boolean
    endCursor: string
}

export const fetchPosts = async ({ cursor, userId }: FetchPostsProps): Promise<FetchPostsResp> => {
    const query = cursor ? `&cursor=${cursor}` : ''
    const res = await axiosInstance.get(`/posts?userId=${userId}${query}`)
    return res.data
}

export const getPost = async (postId: string): Promise<{ post: PostDTO }> => {
    console.log(postId)
    const res = await axiosInstance.get(`/posts/${postId}`)
    return res.data
}
