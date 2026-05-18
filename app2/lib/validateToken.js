const jwt = require("jsonwebtoken")


const tokenValidation = (req, res, next)=>{
    const token = req.header("token")
    if(!token) return res.status(401).json("Access denied")
    const payload = jwt.verify(token,"tokenseguro123") 
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
    const payload = jwt.verify(token,"clave-segura") 
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