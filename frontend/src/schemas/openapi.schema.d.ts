export interface paths {
    '/users': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Get all users */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            data: {
                                id: number
                                email: string
                                name: string
                                createdAt: string
                            }[]
                        }
                    }
                }
            }
        }
        put?: never
        post?: never
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/auth/login': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get?: never
        put?: never
        post: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: {
                content: {
                    'application/json': {
                        /** Format: email */
                        email: string
                        password: string
                    }
                }
            }
            responses: {
                /** @description Login successful */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            access_token: string
                        }
                    }
                }
                /** @description Invalid credentials */
                401: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            error: string
                        }
                    }
                }
            }
        }
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/api/profile': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Returns user profile */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            email: string
                            name: string
                            createdAt: string
                        }
                    }
                }
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            message: string
                        }
                    }
                }
            }
        }
        put?: never
        post?: never
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/tasks': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Get all tasks */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            text: string
                            done: boolean
                            /** @description z-date-time */
                            createdAt: Date
                        }[]
                    }
                }
            }
        }
        put?: never
        post: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: {
                content: {
                    'application/json': {
                        text: string
                    }
                }
            }
            responses: {
                /** @description Create a new task */
                201: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            text: string
                            done: boolean
                            /** @description z-date-time */
                            createdAt: Date
                        }
                    }
                }
            }
        }
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/tasks/:id': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path: {
                    id: string
                }
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Get a task by ID */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            text: string
                            done: boolean
                            /** @description z-date-time */
                            createdAt: Date
                        }
                    }
                }
                /** @description Task not found */
                404: {
                    headers: {
                        [name: string]: unknown
                    }
                    content?: never
                }
            }
        }
        put: {
            parameters: {
                query?: never
                header?: never
                path: {
                    id: string
                }
                cookie?: never
            }
            requestBody?: {
                content: {
                    'application/json': {
                        text?: string
                        done?: boolean
                    }
                }
            }
            responses: {
                /** @description Update a task */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            text: string
                            done: boolean
                            /** @description z-date-time */
                            createdAt: Date
                        }
                    }
                }
                /** @description Task not found */
                404: {
                    headers: {
                        [name: string]: unknown
                    }
                    content?: never
                }
            }
        }
        post?: never
        delete: {
            parameters: {
                query?: never
                header?: never
                path: {
                    id: string
                }
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Delete a task */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            id: number
                            text: string
                            done: boolean
                            /** @description z-date-time */
                            createdAt: Date
                        }
                    }
                }
                /** @description Task not found */
                404: {
                    headers: {
                        [name: string]: unknown
                    }
                    content?: never
                }
            }
        }
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/api/page': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Authorization success message */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            message: string
                        }
                    }
                }
            }
        }
        put?: never
        post?: never
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
    '/hello': {
        parameters: {
            query?: never
            header?: never
            path?: never
            cookie?: never
        }
        get: {
            parameters: {
                query?: never
                header?: never
                path?: never
                cookie?: never
            }
            requestBody?: never
            responses: {
                /** @description Respond a message */
                200: {
                    headers: {
                        [name: string]: unknown
                    }
                    content: {
                        'application/json': {
                            message: string
                        }
                    }
                }
            }
        }
        put?: never
        post?: never
        delete?: never
        options?: never
        head?: never
        patch?: never
        trace?: never
    }
}
export type webhooks = Record<string, never>
export interface components {
    schemas: {
        User: {
            id: number
            email: string
            password: string
            name: string
            createdAt: string
        }
        UserProfile: {
            id: number
            email: string
            name: string
            createdAt: string
        }
        Task: {
            id: number
            text: string
            done: boolean
            /** @description z-date-time */
            createdAt: Date
        }
        Session: {
            id: number
            userId: number
            token: string
            expiresAt: string
            createdAt: string
        }
    }
    responses: never
    parameters: never
    requestBodies: never
    headers: never
    pathItems: never
}
export type $defs = Record<string, never>
export type operations = Record<string, never>
