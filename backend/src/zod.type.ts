import * as z from 'zod'

export const UserSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    createdAt: z.date(),
})
export type User = z.infer<typeof UserSchema>

export const SessionSchema = z.object({
    id: z.number(),
    userId: z.number(),
    token: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
})
export type Session = z.infer<typeof SessionSchema>

export const TaskSchema = z.object({
    id: z.number(),
    text: z.string(),
    done: z.boolean(),
    createdAt: z.date({ description: 'z-date-time' }),
})
export type Task = z.infer<typeof TaskSchema>
