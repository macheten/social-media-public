import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string("Заполните это поле")
    .trim()
    .min(3, "Минимум 3 символа")
    .max(30, "Максимум 30 символов"),
  content: z
    .string("Заполните это поле")
    .trim()
    .min(5, "Минимум 5 символов")
    .max(1000, "Максимум 1000 символов"),
});

export const updateProfileSchema = z.object({
  about: z
    .string("Заполните это поле")
    .trim()
    .min(1, "Заполните это поле")
    .max(50, "Максимум 50 символов"),
  username: z
    .string("Заполните это поле")
    .trim()
    .min(4, "Минимум 4 символа")
    .max(15, "Максимум 15 символов"),
});
