const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authenticate = async(req, res,next)=>{
    try{

        // console.log("here")
        const token = req.cookies.jwtToken
        // console.log(token)

        if(!token){
            return res.status(401).json({message: " unauthorized user - no token found "})
        }
        // console.log(token)
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!verifiedToken){
            return res.status(401).json({message: " unauthorized user - expired token found "})
        }

        // console.log(verifiedToken)

        const verifiedUser = await userModel.findById(verifiedToken.userID).select("-password")
        req.verifiedUser = verifiedUser
        next()

    }catch(err){
        return res.status(500).json({message: " something wrong at authenticate in auth.middleware.js "})
    }
}

module.exports = authenticate