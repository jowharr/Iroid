const jwt = require('jsonwebtoken')
module.exports = (req, res, next)=>{
    try {
        
        const token = req.headers.authorization.split(" ")[1]
        const decodetoken = jwt.verify(token, "secret")
        req.userdata = { fullname: decodetoken.fullname}
        
        next()
    } catch (error) {
        res.status(400).json({
            message: "auth failed"
        })
    }
}