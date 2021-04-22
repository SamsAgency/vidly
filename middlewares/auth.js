const jwt = require("jsonwebtoken");
const config = require("config")

module.exports = (req, res, next) => {
    // checking for the token in the header
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided')

    // decoding
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    }

    catch (exp) {
        res.status(400).send('Invalid Token')
    }
}

// 