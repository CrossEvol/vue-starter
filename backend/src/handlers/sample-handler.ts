import { createRoute, z } from '@hono/zod-openapi'
import { HonoApp } from '../app.type'

function useSampleRoute(app: HonoApp) {
    app.openapi(
        createRoute({
            method: 'get',
            path: '/api/page',
            tags: ['Sample'],
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
            tags: ['Sample'],
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
}

export default useSampleRoute
