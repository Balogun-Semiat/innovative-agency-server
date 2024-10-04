
const userModel = require("../models/userSchema")
const argon2 = require("argon2");
const { createToken } = require("../services/sessionService");
const productModel = require("../models/productSchema");
// const cloudinaryConfig = require("../database/cloudinaryconfig")

async function SignUp(req, res) {
    const {firstName, lastName, email, password, role} = req.body;
    try {
        if(!firstName || !lastName || !email || !password || !role) {
            return res.status(400).send({message: "All fields are required"})
        };
    
        const checkUser = await userModel.findOne({email})
        if(checkUser) {
            return res.status(200).send({message:"User already exists"})
        }
    
        const hashedPassword = await argon2.hash(password);
        console.log("ARGON2",hashedPassword)
    
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role
        })

        // Generate JWT token for the user
        // const token = createToken(email);
        console.log("User",newUser)
        return res.status(200).send({message: "User craeted successfully", newUser}) 
    } catch (error) {
        console.log(error)
    }
}

async function logIn(req, res){
    try {
        const {email, password} = req.body;
        if(!email ||!password) {
            console.log("All fields are required");
            return res.status(400).send({message: "All fields are required"})
        }
            
        const user = await userModel.findOne({email});
        // Check if user exists
        if (!user) {
            console.log("User not found");
            return res.status(401).send({ message: "User not found" });
        }

        const hashedPassword = user.password
        const verify = await argon2.verify(hashedPassword, password)

    if(!verify) {
        console.log("Incorrect password")
        return res.status(401).send({message: "Incorrect password"})
    }
    const token = createToken(email);
    if (!token) {
        console.log("No token providded")
        return res.status(401).json({ message: 'No token provided' });
      }

     
    console.log("User",user, token)
    return res.status(200).send({message: "User found", user, token})
    } catch (error) {
        console.log(error)
    }
}

const AllUsers = async(req, res)=>{
    const allUsers = await userModel.find({})
    res.send(allUsers)
}

const getOneUser = async(req, res)=>{
    const {id} = req.params;
    const user = await userModel.findOne({_id:id})
    if(!user) return res.status(400).send({message: "User not found"});
    res.send({message: "User found", user})
}

const updateUser = async(req, res)=>{
    try{
        const {id} = req.params;
        const user = req.body;

        const updateUser = await userModel.findOneAndUpdate({_id:id}, user);
        if(!updateUser) return res.status(400).send({message: "Internal server error"});
        return res.status(200).send({message: "User has been updated", user})
    } catch(error){
        console.log(error)
    }
}


const deleteUser = async(req, res)=>{
    try{
        const {id} = req.params
        const deleteById = await userModel.deleteOne({_id:id});
        if(!deleteById) return res.status(400).send({message: "User not found"});
        return res.status(200).send({message: "User has been deleted"})
    }catch(error){
        console.log(error)
    }
}
module.exports = { SignUp, logIn, AllUsers, getOneUser, updateUser, deleteUser };