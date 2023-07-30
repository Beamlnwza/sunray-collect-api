import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from './server.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
