'use server'

import { prisma } from "@db/prisma-client"
import { getAuthUser } from "@shared/lib/get-auth-user"

export async function deletePost(postId: string) {
    const session = await getAuthUser()

    await prisma.post.delete({
        where: {
            id: postId
        }
    })
}