import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/test', (req, res) => {
    res.send('Hello World Test')
})

export default router
