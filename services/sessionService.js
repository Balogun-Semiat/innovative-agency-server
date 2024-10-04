const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../constants/index")

const createToken = (email) => {
    try{
        const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "5h"})

        // if (tokenExpired) {
        //     return res.status(401).json({ message: "Token has expired" });
        // }
        return token
    } catch(error) {
        throw error
    }
}

const verifyToken = (token)=> {
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded  
    } catch(error) {
        throw error
    }
}


module.exports = { createToken, verifyToken}