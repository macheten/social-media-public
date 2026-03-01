import { z } from "zod";

const passwordSchema = z
  .string("Заполните это поле")
  .min(4, "Минимальная длина пароля - 4 символа")
  .max(15, "Максимальная длина пароля - 15 символов");
const emailSchema = z.email("Введите корректную почту")

export const loginSchema = z.object({
  // email: z.email("Введите корректную почту"),
  password: passwordSchema,
});

export const registerSchema = z.object({
  username: z
    .string("Заполните это поле")
    .min(4, "Минимальный размер имени - 4 символа")
    .max(15, "Максимальный размер имени - 15 символов"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string('Заполните это поле')
}).refine((data) =>
  data.password === data.confirmPassword, {message: 'Пароли не совпадают', path: ['confirmPassword']}
)

