const {Router} = require("express");
const messageRoute = Router();
const ValidateToken = require("../middleware/ValidateToken")

const {Messages, fetchMessages, getAllMessages} = require("../controllers/messageController")

messageRoute.post("/send-message/:propertyId", ValidateToken, Messages)
messageRoute.post("/fetch/:sellerId", fetchMessages)
messageRoute.get("/all-msg", getAllMessages)

module.exports = messageRoute;