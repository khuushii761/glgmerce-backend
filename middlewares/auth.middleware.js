
let jwt = require('jsonwebtoken')
module.exports.auth = (types) => async(req, res, next)=>{
    try {
        let token =  req.header('Authorization')
        if(!token){
            return res.status(400).send({message:"Access denied. No token provided", success:false})
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded)
        {
            return res.status(401).send({message:"Access denied. Invalid token", success:false})
        }
        if(!types.includes(decoded.type))
        {
            return res.status(403).send({message:"Access denied. You do not have permission to access this resources. ", success:false})

        }
        next()
    } catch (error) {
        console.log(error);
        
                return res.status(500).json({ message: "Internal server error", success: false })
        
    }
}