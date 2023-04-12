const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = '8000'

const whitelist = ["http://localhost:3000"]
const corsOption = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOption))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello express!')
})

app.post('/login', (req, res) => {
    console.log(req.body)
    return res.status(200).json({ success: 'true' })
})

app.listen(PORT, () => {
    console.log(`Express server on ${PORT}`)
})