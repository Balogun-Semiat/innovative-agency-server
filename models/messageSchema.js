const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required:true},
    propertyId:{type: mongoose.Schema.Types.ObjectId, ref:"Properties", required:true},
    message:{type: String, required:true},
    timeStamp:{type: Date, default: Date.now}
})

const messageModel = mongoose.model("Messages", MessageSchema);

module.exports = messageModel;