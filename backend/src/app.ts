import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { bearerAuth } from 'hono/bearer-auth'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { IEnv } from './app.type'
import { getUserByID, getValidSession } from './database'
import useSampleRoute from './handlers/sample-handler'
import useTaskRoute from './handlers/task-handler'
import useUserRoute from './handlers/user-handler'
import { getFromJWT } from './utils/jwt.util'
import {
    SessionSchema,
    TaskSchema,
    UserProfileSchema,
    UserSchema,
} from './zod.type'

const app = new OpenAPIHono<IEnv, {}, '/'>()

/* bind models */
app.openAPIRegistry.register('User', UserSchema)
app.openAPIRegistry.register('UserProfile', UserProfileSchema)
app.openAPIRegistry.register('Task', TaskSchema)
app.openAPIRegistry.register('Session', SessionSchema)

/* bind security scheme */
app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
})

/* bind middlewares */
app.use(logger())
app.use(cors())
app.use(
    '/api/*',
    bearerAuth({
        verifyToken: async (token, c) => {
            try {
                // Decode the JWT token
                const userID = getFromJWT<number>(token, 'userID')

                // Check if there's a valid session
                const session = await getValidSession(userID)
                if (!session) {
                    return false
                }
                const user = await getUserByID(userID)
                if (!user) {
                    console.log(`User#${userID} not found.`)
                }
                c.set('user', user)

                // Verify that the session belongs to the correct user
                return true
            } catch (error) {
                console.error('Token verification failed:', error)
                return false
            }
        },
    }),
)

/* bind routes */
useUserRoute(app)
useTaskRoute(app)
useSampleRoute(app)

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
