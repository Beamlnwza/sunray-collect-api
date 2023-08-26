import { NextFunction, Request, Response } from 'express'
import { z, AnyZodObject } from 'zod'

const dataSchema = z.object({
    body: z.object({
        machineId: z.string({
            required_error: 'machineId is required',
        }),
        cilentTime: z.string({
            required_error: 'cilentTime is required',
        }),
        voltage: z.string({
            required_error: 'volatage is required',
        }),
        current: z.string({
            required_error: 'current is required',
        }),
        power: z.string({
            required_error: 'power is required',
        }),
    }),
})

const dataGetSchema = z.object({
    query: z.object({
        machineId: z.optional(z.string()),
        limit: z.optional(z.number()),
    }),
})

const validate =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.safeParseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            return next()
        } catch (error) {
            return res.status(400).json(error)
        }
    }

export { dataSchema, validate, dataGetSchema }
