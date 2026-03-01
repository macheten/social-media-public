"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@db/prisma-client";

export interface UpdateProfileProps {
  username: string;
  about: string;
}

interface ReturnType {
  message: string;
  success: boolean;
}

export async function updateProfile({
  about,
  username,
}: UpdateProfileProps): Promise<ReturnType> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      message: "Что-то пошло не так",
      success: false,
    };
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },

    data: {
      about,
      username,
    },
  });

  return {
    message: "Профиль успешно обновлён",
    success: true,
  };
}
