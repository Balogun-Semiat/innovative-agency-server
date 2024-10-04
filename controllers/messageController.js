const messageModel = require("../models/messageSchema");
const productModel = require("../models/productSchema")
const userModel = require("../models/userSchema")

const Messages = async(req, res) => {
    try {
        const { message } = req.body;
        const { propertyId } = req.params;
        const senderId = req.user.id; //we assume the sender is the current user
        console.log("REQ",req.user)

        console.log("sender", senderId);
        console.log("Incoming propertyId:", propertyId);

    const property = await productModel.findById(propertyId).populate('seller'); // Populate seller details
    if (!property) {
        return res.status(404).send({ message: 'Property not found' });
    }

    if (!property.seller || !property.seller._id) {
        return res.status(400).send({ message: 'Seller information not found for this property' });
    }
    // console.log("sell",property.seller)
    const sellerId = property.seller._id;
    console.log("seller", sellerId)

    if (senderId.toString() === sellerId.toString()) {
        return res.status(400).send({ message: "You cannot send a message to yourself" });
    }

    const newMessage = await messageModel.create({
            sender: senderId, 
            seller: sellerId,
            propertyId: propertyId,
            message
        });
        await userModel.findByIdAndUpdate(senderId, {
            $push: { messages: newMessage._id }
        });
        res.status(200).send({message: "Message sent successfully", newMessage})
    } catch (error) {
        res.status(500).send({error:"Error sending message"})
        console.log(error)
    }
}

const getAllMessages = async(req, res)=>{
    try {
        const getMessages = await messageModel.find({});
        res.send(getMessages)
    } catch (error) {
        console.log(error)
    }
}
const fetchMessages = async(req,res)=>{
    const {sellerId} = req.params;
    try {
        const messages = await messageModel.find({receiver: sellerId}).populate("sender");
        res.send(messages)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
        console.log(error)
    }
}

module.exports = {Messages, fetchMessages, getAllMessages}