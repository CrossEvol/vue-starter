import * as z from 'zod'

export const UserSchema = z.object({
    id: z.number(),
    fullName: z.string(),
})
export type Users = z.infer<typeof UserSchema>

export const ProjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    ownerId: z.number(),
})
export type Projects = z.infer<typeof ProjectSchema>

export const UserWithProjectsSchema = UserSchema.extend({
    projects: z.array(ProjectSchema),
})

export type UserWithProjects = z.infer<typeof UserWithProjectsSchema>

export const TaskSchema = z.object({
    id: z.number(),
    text: z.string(),
    done: z.boolean(),
    createdAt: z.date({ description: 'z-date-time' }),
})

export type Task = z.infer<typeof TaskSchema>
