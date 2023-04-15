const jwt = require('jsonwebtoken')


const manager = {
    // token 생성
    generate: (body, isAccess) => {
        let expiredTime
        const secret = 'secret key'

        // 만료기한 access token: 1시간 / refresh token: 한달
        isAccess ? expiredTime = '1h' : expiredTime = '30d'
        return jwt.sign(body, secret, { expiresIn: expiredTime })
    },

    // token 검증
    verify: (token) => {
        const secret = 'secret key'
        return jwt.verify(token, secret)
    }
}

module.exports = {
    manager
}