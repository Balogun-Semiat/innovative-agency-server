const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    images: [{public_id: {type: String, required: true}, secure_url:{type: String, required: true}}],
    houseDetails: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    role: {type: String, enum: ["Rent", "Sale", "Shortlet"], required: true},
    price: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required:true }
})

const productModel = mongoose.model("Properties", ProductSchema);

module.exports = productModel;