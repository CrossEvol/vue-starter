import { OpenAPIHono } from '@hono/zod-openapi'
import { User } from './zod.type'

export type IEnv = { Variables: { user: User } }

export type HonoApp = OpenAPIHono<IEnv, {}, '/'>
