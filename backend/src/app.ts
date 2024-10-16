import { swaggerUI } from '@hono/swagger-ui'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    getUsersWithProject,
    updateTask,
} from './database'
import {
    ProjectSchema,
    TaskSchema,
    UserSchema,
    UserWithProjectsSchema,
} from './zod.type'

const app = new OpenAPIHono()

app.openAPIRegistry.register('User', UserSchema)
app.openAPIRegistry.register('Project', ProjectSchema)
app.openAPIRegistry.register('Task', TaskSchema)
app.openAPIRegistry.register('UserWithProjects', UserWithProjectsSchema)

app.use(logger())
app.use(cors())

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

// Create Task
app.openapi(
    createRoute({
        method: 'post',
        path: '/tasks',
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: TaskSchema.pick({ text: true }),
                    },
                },
            },
        },
        responses: {
            201: {
                description: 'Create a new task',
                content: {
                    'application/json': {
                        schema: TaskSchema,
                    },
                },
            },
        },
    }),
    async (c) => {
        const body = await c.req.json()
        const task = await createTask(body)
        return c.json(task, 201)
    },
)

// Read All Tasks
app.openapi(
    createRoute({
        method: 'get',
        path: '/tasks',
        responses: {
            200: {
                description: 'Get all tasks',
                content: {
                    'application/json': {
                        schema: z.array(TaskSchema),
                    },
                },
            },
        },
    }),
    async (c) => {
        const tasks = await getAllTasks()
        return c.json(tasks)
    },
)

// Read Task by ID
app.openapi(
    createRoute({
        method: 'get',
        path: '/tasks/:id',
        request: {
            params: z.object({
                id: z.string().transform((val) => parseInt(val, 10)),
            }),
        },
        responses: {
            200: {
                description: 'Get a task by ID',
                content: {
                    'application/json': {
                        schema: TaskSchema,
                    },
                },
            },
            404: {
                description: 'Task not found',
            },
        },
    }),
    async (c) => {
        const { id } = c.req.valid('param')
        const task = await getTaskById(id)
        if (!task) {
            return c.json({ message: 'Task not found' }, 404)
        }
        return c.json(task)
    },
)

// Update Task
app.openapi(
    createRoute({
        method: 'put',
        path: '/tasks/:id',
        request: {
            params: z.object({
                id: z.string().transform((val) => parseInt(val, 10)),
            }),
            body: {
                content: {
                    'application/json': {
                        schema: TaskSchema.partial().omit({
                            id: true,
                            createdAt: true,
                        }),
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Update a task',
                content: {
                    'application/json': {
                        schema: TaskSchema,
                    },
                },
            },
            404: {
                description: 'Task not found',
            },
        },
    }),
    async (c) => {
        const { id } = c.req.valid('param')
        const body = await c.req.json()
        const updatedTask = await updateTask(id, body)
        if (!updatedTask) {
            return c.json({ message: 'Task not found' }, 404)
        }
        return c.json(updatedTask)
    },
)

// Delete Task
app.openapi(
    createRoute({
        method: 'delete',
        path: '/tasks/:id',
        request: {
            params: z.object({
                id: z.string().transform((val) => parseInt(val, 10)),
            }),
        },
        responses: {
            200: {
                description: 'Delete a task',
                content: {
                    'application/json': {
                        schema: TaskSchema,
                    },
                },
            },
            404: {
                description: 'Task not found',
            },
        },
    }),
    async (c) => {
        const { id } = c.req.valid('param')
        const deletedTask = await deleteTask(id)
        if (!deletedTask) {
            return c.json({ message: 'Task not found' }, 404)
        }
        return c.json(deletedTask)
    },
)

// Export the Hono app
export default app
