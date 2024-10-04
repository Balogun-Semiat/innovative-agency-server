const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ["buyer", "seller"], required: true},
    postings: [{type: mongoose.Schema.Types.ObjectId, ref:"Properties", required: true}],
    messages:[ {type: mongoose.Schema.Types.ObjectId, ref:"Messages", required: true}],
    password:{type: String, required: true}
})


const userModel = mongoose.model("Users", UserSchema);

module.exports = userModel;