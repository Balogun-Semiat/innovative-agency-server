const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true}],
    // messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Messages", required: true}],
    // lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: "Chats", required: true},
    createdAt: { type: Date, default: Date.now}
})

const conversationModel = mongoose.model("Conversations", conversationSchema);

module.exports = conversationModel;