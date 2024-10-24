import { createRoute, z } from '@hono/zod-openapi'
import { HonoApp } from '../app.type'
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    updateTask,
} from '../database'
import { TaskSchema } from '../zod.type'

function useTaskRoute(app: HonoApp) {
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
}

export default useTaskRoute
