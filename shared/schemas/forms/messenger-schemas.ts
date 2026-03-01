import { z } from 'zod'

export const createMessageSchema = z.object({
    content: z.string().trim().min(1, 'Сообщение не должно быть пустым')
})