import { Router, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'
import { dataGetSchema, dataSchema, validate } from './dataschema.js'
const prisma = new PrismaClient()

const router = Router()

// GET /api/electric
router.get('/electric', async (req: Request, res: Response) => {
    const data = await prisma.electric.findMany({
        orderBy: {
            serverTime: 'asc',
        },
        take: 10,
    })

    return res.json(data).status(200)
})

// GET /api/electric?MachineId=xxx?limit=10
router.get(
    '/electric',
    validate(dataGetSchema),
    async (req: Request, res: Response) => {
        const { machineId } = req.query
        const data = await prisma.electric.findMany({
            where: {
                machineId: machineId as string,
            },
            orderBy: {
                serverTime: 'asc',
            },
            take: 10,
        })

        return res.json(data).status(200)
    }
)

// POST /api/electric
router.post(
    '/electric',
    validate(dataSchema),
    async (req: Request, res: Response) => {
        let serverDate: Date = new Date()
        const { machineId, cilentTime, voltage, current, power } = req.body

        const data = await prisma.electric.create({
            data: {
                machineId: machineId,
                clientTime: cilentTime,
                serverTime: serverDate,
                voltage: voltage,
                current: current,
                power: power,
            },
        })

        console.log(serverDate, req.body, data)
        return res.json({ ...req.body })
    }
)

export default router
