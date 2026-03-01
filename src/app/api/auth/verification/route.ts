import { prisma } from "@db/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  console.log(code);

  if (!code) {
    return NextResponse.json(
      { message: "code searchParam is required" },
      { status: 400 }
    );
  }

  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code
    },
  });

  if (verificationCode) {
    await prisma.user.update({
        where: {
            id: verificationCode.userId
        },
        data: {
            activated: true
        }
    })

    await prisma.verificationCode.delete({
        where: {
            id: verificationCode.id
        }
    })
    return NextResponse.redirect(new URL('/?verified', req.url))
  }

  return NextResponse.json({ message: "verification failed" });
}
