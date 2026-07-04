const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(403).json({message: "Missing token"})
        }
        console.log('token '.token)
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decode '.decode)
        req.user = decode

        next()
    } catch(err) {
        res.status(500).json({ message: err })
    }
}