const {Router} = require("express");
const profileRoute = Router();
const ValidateToken = require("../middleware/ValidateToken")

const {getUserProfile, deleteEverything} = require("../controllers/profileController")


profileRoute.get("/profile", ValidateToken, getUserProfile)
profileRoute.delete("/del-eve", ValidateToken, deleteEverything)

module.exports = profileRoute