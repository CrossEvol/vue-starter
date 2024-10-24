import { createRoute, z } from '@hono/zod-openapi'
import { HonoApp } from '../app.type'
import { ProjectSchema, UserSchema } from '../zod.type'
import { getUsersWithProject } from '../database'

function useUserRoute(app: HonoApp) {
    app.openapi(
        createRoute({
            method: 'get',
            path: '/users',
            responses: {
                200: {
                    description: 'Create new User with Project',
                    content: {
                        'application/json': {
                            schema: z.object({
                                data: z.array(
                                    UserSchema.extend({
                                        projects: z.array(ProjectSchema),
                                    }),
                                ),
                            }),
                        },
                    },
                },
            },
        }),
        async (c) => {
            const res = await getUsersWithProject()

            return c.json({ data: res })
        },
    )
}

export default useUserRoute
