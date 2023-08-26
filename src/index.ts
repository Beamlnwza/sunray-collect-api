import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from './server.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('welcome kub')
    res.send('contact beam for more information')
    res.send('supawitmarayat@gmail.com')
})

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})
