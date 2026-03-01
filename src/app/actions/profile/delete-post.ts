'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { prisma } from "@db/prisma-client"

export async function deletePost(postId: string) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error('unauthorized')
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    })
}