import { createRoute, z } from '@hono/zod-openapi'
import { HonoApp } from '../app.type'
import {
    createSession,
    getUserByEmail,
    getUsers,
    verifyPassword,
    deleteUserSessions,
} from '../database'
import { createJWT } from '../utils/jwt.util'
import { UserProfileSchema } from '../zod.type'

function useUserRoute(app: HonoApp) {
    app.openapi(
        createRoute({
            method: 'get',
            path: '/users',
            tags: ['User'],
            responses: {
                200: {
                    description: 'Get all users',
                    content: {
                        'application/json': {
                            schema: z.object({
                                data: z.array(UserProfileSchema),
                            }),
                        },
                    },
                },
            },
        }),
        async (c) => {
            const users = await getUsers()
            return c.json(
                {
                    data: users.map((u) => ({ ...u, password: undefined })),
                },
                200,
            )
        },
    )

    app.openapi(
        createRoute({
            method: 'post',
            path: '/auth/login',
            tags: ['User'],
            request: {
                body: {
                    content: {
                        'application/json': {
                            schema: z.object({
                                email: z.string().email(),
                                password: z.string(),
                            }),
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: z.object({
                                access_token: z.string(),
                            }),
                        },
                    },
                },
                401: {
                    description: 'Invalid credentials',
                    content: {
                        'application/json': {
                            schema: z.object({
                                error: z.string(),
                            }),
                        },
                    },
                },
            },
        }),
        async (c) => {
            const { email, password } = await c.req.json()

            const user = await getUserByEmail(email)
            if (!user) {
                return c.json({ error: 'Invalid credentials' }, 401)
            }

            const isValid = await verifyPassword(password, user.password)
            if (!isValid) {
                return c.json({ error: 'Invalid credentials' }, 401)
            }

            const token = createJWT({ userID: user.id })

            // Create session
            await createSession(user.id, token)

            return c.json({ access_token: token }, 200)
        },
    )

    app.openapi(
        createRoute({
            method: 'get',
            path: '/api/profile',
            tags: ['User'],
            security: [
                {
                    Bearer: [],
                },
            ],
            responses: {
                200: {
                    description: 'Returns user profile',
                    content: {
                        'application/json': {
                            schema: UserProfileSchema,
                        },
                    },
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: z.object({
                                message: z.string(),
                            }),
                        },
                    },
                },
            },
        }),
        (c) => {
            const user = c.get('user')
            if (!user) {
                return c.json({ message: 'Unauthorized' }, 401)
            }
            return c.json({ ...user, password: undefined }, 200)
        },
    )

    app.openapi(
        createRoute({
            method: 'post',
            path: '/api/logout',
            tags: ['User'],
            security: [
                {
                    Bearer: [],
                },
            ],
            responses: {
                200: {
                    description: 'Logout successful',
                    content: {
                        'application/json': {
                            schema: z.object({
                                message: z.string(),
                            }),
                        },
                    },
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            schema: z.object({
                                message: z.string(),
                            }),
                        },
                    },
                },
            },
        }),
        async (c) => {
            const user = c.get('user')
            if (!user) {
                return c.json({ message: 'Unauthorized' }, 401)
            }

            await deleteUserSessions(user.id)
            return c.json({ message: 'Logged out successfully' }, 200)
        },
    )
}

export default useUserRoute
