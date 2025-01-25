const jwt = require("jsonwebtoken")

 const generateJWTToken = (userID, res)=>{

    const token = jwt.sign({userID}, process.env.JWT_SECRET_KEY, {expiresIn: '30m'})

    res.cookie("jwtToken", token, {
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict', // Or 'lax' depending on your needs
        domain: 'localhost', // Important for local development
        path: '/', // Make the cookie available on all paths
        secure: process.env.NODE_ENV === 'production', 
    })

    return token

}

module.exports = generateJWTToken