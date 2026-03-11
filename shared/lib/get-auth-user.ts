import { authOptions } from "@src/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const getAuthUser = async  () => {
    const session = await getServerSession(authOptions)

    if (!session?.user.id) {
        throw new Error("Unauthorized")
    }

    return session
}