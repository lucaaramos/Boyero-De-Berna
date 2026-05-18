const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET;

const tokenValidation = (req, res, next)=>{
    const token = req.header("token")
    if(!token) return res.status(401).json("Access denied")
    const payload = jwt.verify(token, JWT_SECRET) 
    req.user = {
        email : payload.email,
        name: payload.name,
        id: payload.id,
        type:payload.type
    }
    next()
}

const resetPasswordToken= (req, res, next)=>{
    const token = req.header("token")
    if(!token) return res.status(401).json("Access denied")
    const payload = jwt.verify(token, JWT_PASSWORD_RESET_SECRET) 
    req.user = {
        id: payload.id,
        userId: payload.id,
    }
    next()
}
module.exports = {
    tokenValidation,
    resetPasswordToken
}
