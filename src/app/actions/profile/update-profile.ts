"use server";

import { prisma } from "@db/prisma-client";
import { getAuthUser } from "@shared/lib/get-auth-user";

export interface UpdateProfileProps {
  username: string;
  about: string;
}

export async function updateProfile({ about, username }: UpdateProfileProps) {
  const session = await getAuthUser();

  await prisma.user.update({
    where: {
      id: session.user.id,
    },

    data: {
      about,
      username,
    },
  });
}
