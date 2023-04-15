const jwt = require('jsonwebtoken')
const Token = require('../bin/Token')
const secret = 'secret key'

const authenticate = ((req, res, next) => {

    // 두 토큰 모두 있는 경우
    if(req.headers.access && req.headers.refresh) {
        const AToken = req.headers.access.split(' ')[1]
        const RToken = req.headers.refresh.split(' ')[1]
        jwt.verify(AToken, secret, (err, decoded) => {
            // Access token이 검증이 안되는 경우
            if(err) {
                jwt.verify(RToken, secret, (err, decoded) => {
                    // Refresh token도 검증이 안되는 경우
                    if(err) return res.status(400).json({ success: false })

                    // Refresh token은 검증이 되는 경우
                    if(decoded) {
                        const AToken = Token.manager.generate({
                            username: decoded.username 
                        }, true)
                        req.access = AToken
                        next()
                    }
                })
            }
            // Access token 검증 되는 경우
            if(decoded) next()
        })
    // refresh 토큰만 있을 때
    } else if (!req.headers.access && req.headers.refresh) {
        const RToken = req.headers.refresh.split(' ')[1]
        jwt.verify(RToken, secret, (err, decoded) => {

            // refresh 검증이 안된 경우
            if(err) return res.status(400).json({ success: false })

            // refresh 검증이 된 경우
            if(decoded) {
                const AToken = Token.manager.generate({ username: decoded.username }, true)
                req.access = AToken
                next()
            }
        })
    
    // access 토큰만 있을때
    } else if (req.headers.access && !req.headers.refresh) {
        const AToken = req.headers.access.split(' ')[1]
        jwt.verify(AToken, secret, (err, decoded) => {
            // access 검증이 안된 경우
            if(err) return res.status(400).json({ succses: false })

            // access 검증이 된 경우
            if(decoded) next()
        })
    // 두 토큰 전부 없을 경우
    } else {
        return res.status(400).json({ success: false })
    }    
})

module.exports = {
    authenticate
}