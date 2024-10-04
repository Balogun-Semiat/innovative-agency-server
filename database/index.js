const mongoose = require("mongoose")
const {CONNECTION_STRING} = require("../constants/index")

const ConnectToDB = async()=>{
    try {
        const connect = await mongoose.connect(CONNECTION_STRING)
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}

module.exports = ConnectToDB