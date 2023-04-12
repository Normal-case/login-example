const express = require('express')
const app = express()
const PORT = '8000'

app.get('/', (req, res) => {
    res.send('Hello express!')
})

app.listen(PORT, () => {
    console.log(`Express server on ${PORT}`)
})