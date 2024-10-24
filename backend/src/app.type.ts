import { OpenAPIHono } from '@hono/zod-openapi'
import { Env } from 'hono/types'

export type HonoApp = OpenAPIHono<Env, {}, '/'>
