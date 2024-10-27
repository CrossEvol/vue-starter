import { swaggerUI } from '@hono/swagger-ui'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { bearerAuth } from 'hono/bearer-auth'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import useTaskRoute from './handlers/task-handler'
import useUserRoute from './handlers/user-handler'
import { TaskSchema, UserSchema, SessionSchema } from './zod.type'

const app = new OpenAPIHono()

app.openAPIRegistry.register('User', UserSchema)
app.openAPIRegistry.register('Task', TaskSchema)
app.openAPIRegistry.register('Session', SessionSchema)

app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
})

app.use(logger())
app.use(cors())

useUserRoute(app)
useTaskRoute(app)

const defaultToken = 'honoiscool'

app.use(
    '/api/*',
    bearerAuth({
        verifyToken: async (token, _c) => {
            return token === defaultToken
        },
    }),
)

app.openapi(
    createRoute({
        method: 'get',
        path: '/api/page',
        security: [
            {
                Bearer: [], // <- Add security name (must be same)
            },
        ],
        responses: {
            200: {
                description: 'Authorization success message',
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
        return c.json({
            message: 'You are authorized',
        })
    },
)

// just the sample for request and response
app.openapi(
    createRoute({
        method: 'get',
        path: '/hello',
        responses: {
            200: {
                description: 'Respond a message',
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
        return c.json({
            message: 'hello',
        })
    },
)

app.get(
    '/ui',
    swaggerUI({
        url: '/doc',
    }),
)

app.doc('/doc', {
    info: {
        title: 'An API',
        version: 'v1',
    },
    openapi: '3.1.0',
})

// Export the Hono app
export default app
