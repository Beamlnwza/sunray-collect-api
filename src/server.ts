import { Router, Request, Response } from 'express'

import { PrismaClient, electric } from '@prisma/client'
import { dataGetSchema, dataSchema, validate } from './dataschema.js'
const prisma = new PrismaClient()

const router = Router()

// GET /api/electric?machineId=1&limit=10
router.get(
    '/electric',
    validate(dataGetSchema),
    async (req: Request, res: Response) => {
        const { machineId, limit } = req.query

        const queryOptions = {
            take: limit === undefined ? 10 : Number(limit),
            orderBy: {
                serverTime: 'desc',
            },
        } as any

        let data
        if (machineId === undefined) {
            data = await prisma.electric.findMany(...queryOptions)
        } else {
            data = await prisma.electric.findMany({
                ...queryOptions,
                where: {
                    machineId: machineId as string,
                },
            })
        }

        return res.json(data).status(200)
    }
)

// POST /api/electric
router.post(
    '/electric',
    validate(dataSchema),
    async (req: Request, res: Response) => {
        const { machineId, cilentTime, voltage, current, power } = req.body

        try {
            const data = await prisma.electric.create({
                data: {
                    machineId: machineId,
                    clientTime: new Date(),
                    serverTime: new Date(cilentTime),
                    voltage: voltage,
                    current: current,
                    power: power,
                },
            })

            console.log(new Date(), req.body, data)
            return res.json(data).status(200)
        } catch (error) {
            console.log(new Date(), req.body, error)

            return res.json(error).status(500)
        }
    }
)

export default router
