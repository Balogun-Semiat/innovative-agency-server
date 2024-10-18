const userModel = require("../models/userSchema")
const {verifyToken} = require("../services/sessionService") 


const ValidateToken = async(req, res, next) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).send({message:"Unauthorized"});
        // console.log(token)
        const decodedToken = verifyToken(token);
        console.log(decodedToken);
        const email = decodedToken.email;
        const user = await userModel.findOne({email});
        if(!user) return res.status(401).send({message:"Unauthorized"});
        req.user = user;
        // console.log("User", user);
        
        next(); 
    } catch(error){
        throw error
    }
}

module.exports = ValidateToken