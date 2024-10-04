const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    // recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages", required: true }],
    text: { type: String, required: true },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Messages", required: true },
    createdAt: { type: Date, default: Date.now }
})

const chatModel = mongoose.model("Chats", chatSchema);

// Export the Chat model for use in other files.
module.exports = chatModel;