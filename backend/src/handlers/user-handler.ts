import { createRoute, z } from '@hono/zod-openapi'
import { HonoApp } from '../app.type'
import { UserSchema } from '../zod.type'
import { getUsers } from '../database'

function useUserRoute(app: HonoApp) {
    app.openapi(
        createRoute({
            method: 'get',
            path: '/users',
            responses: {
                200: {
                    description: 'Get all users',
                    content: {
                        'application/json': {
                            schema: z.object({
                                data: z.array(UserSchema),
                            }),
                        },
                    },
                },
            },
        }),
        async (c) => {
            const res = await getUsers()
            return c.json({ data: res })
        },
    )
}

export default useUserRoute
