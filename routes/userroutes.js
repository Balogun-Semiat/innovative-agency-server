const { Router } = require("express")
const userRoutes = Router()

const {SignUp, logIn, AllUsers, getOneUser, updateUser, deleteUser} = require("../controllers/userController")
const ValidateToken = require("../middleware/ValidateToken")


userRoutes.post("/sign-up", SignUp)
userRoutes.post("/login", logIn)
userRoutes.get("/users", AllUsers)
userRoutes.get("/get-user/:id", getOneUser)
userRoutes.patch("/update/:id", updateUser)
userRoutes.delete("/delete/:id", deleteUser)



module.exports = userRoutes