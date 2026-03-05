"use server";
import crypto from 'crypto';
import { prisma } from "@db/prisma-client";
import { RegisterEmail } from "@shared/components/shared/email-templates/register-email";
import { sendEmail } from "@shared/lib/send-email";
import { hashSync } from "bcrypt";

interface RegisterProps {
  username: string;
  email: string;
  password: string;
}

interface ReturnType {
    message: string
    success: boolean
}

export async function register({ email, password, username }: RegisterProps): Promise<ReturnType> {
    const alreadyExist = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (alreadyExist) {
        return {
            message: 'Пользователь с таким email уже существует',
            success: false
        }
    }

    const pwHash = hashSync(password, 10)
    const user = await prisma.user.create({
        data: {
            email, password: pwHash, username
        }
    })

    const code = crypto.randomUUID()

    await prisma.verificationCode.create({
        data: {
            code,
            userId: user.id
        }
    })

    await sendEmail({
        subject: 'Подтвердите регистрацию',
        to: email,
        template: await RegisterEmail({ code }),
    })

    return {
        message: 'Проверьте почту и подтвердите аккаунт',
        success: true
    }
}
