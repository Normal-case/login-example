const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const rounds = 10 // Key Stretching
const Token = require('./bin/Token')
const { authenticate } = require('./middleware/authenticate')
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
    // user.json 파일이 존재하지 않을 때 초기화
    if(!fs.existsSync('user.json')) {
        fs.writeFileSync('user.json', JSON.stringify(
            {'name': [], 'username': [], 'password': []})
        )
    }

    // token.json 파일이 존재하지 않을 때 초기화
    if(!fs.existsSync('token.json')) {
        fs.writeFileSync('token.json', JSON.stringify(
            {'username': [], 'refresh': []}
        ))
    }

    var userString = fs.readFileSync('user.json').toString()
    var userJSON = JSON.parse(userString)
    const userIdx = userJSON['username'].indexOf(req.body.username)

    // 아이디가 존재하지 않을 경우
    if(userIdx < 0) {
        return res.status(400).json({ success: false, msg: 'Id or psword is wrong' })
    }

    // 비밀번호가 다를 경우
    if(!bcrypt.compareSync(req.body.password, userJSON['password'][userIdx])) {
        return res.status(400).json({ success: false, msg: 'Id or psword is wrong' })
    }

    // 토큰 생성
    const payload = { username: req.body.username }
    const Atoken = Token.manager.generate(payload, true)
    const Rtoken = Token.manager.generate(payload, false)

    var refreshString = fs.readFileSync('token.json').toString()
    var refreshJSON = JSON.parse(refreshString)
    const refreshIdx = refreshJSON['username'].indexOf(req.body.username)
    
    // token이 이미 존재하는 경우
    if(refreshIdx > -1) {
        refreshJSON['username'].splice(refreshIdx, 1)
        refreshJSON['refresh'].splice(refreshIdx, 1)
    }

    refreshJSON['username'].push(req.body.username)
    refreshJSON['refresh'].push(Rtoken)
    fs.writeFileSync('token.json', JSON.stringify(refreshJSON))

    return res.status(200).json({
        success: true,
        accesstoken: Atoken,
        refreshtoken: Rtoken
    })
})

app.post('/register', (req, res) => {

    // user.json 파일이 존재하지 않을 때 초기화
    if(!fs.existsSync('user.json')) {
        fs.writeFileSync('user.json', JSON.stringify(
            {'name': [], 'username': [], 'password': []})
        )
    }
    var userString = fs.readFileSync('user.json').toString()
    var userJSON = JSON.parse(userString)

    // 해당 username이 존재하면 이미 존재한다는 메시지와 함께 400 status 응답
    if(userJSON['username'].indexOf(req.body.username) !== -1) {
        return res.status(400).json({ success: false, msg: 'username alread exist'})
    }

    // 비밀번호 암호화
    const encryptedPs = bcrypt.hashSync(req.body.password, rounds)

    // username이 존재하지 않으면 추가 후 저장
    userJSON['name'].push(req.body.name)
    userJSON['username'].push(req.body.username)
    userJSON['password'].push(encryptedPs)
    fs.writeFileSync('user.json', JSON.stringify(userJSON))
    return res.status(200).json({ success: true })
})

app.get('/profile', authenticate, (req, res) => {
    return res.status(200).json({ success: true, accesstoken: req.access })
})

app.listen(PORT, () => {
    console.log(`Express server on ${PORT}`)
})