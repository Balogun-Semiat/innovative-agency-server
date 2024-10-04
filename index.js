const express = require("express")
const userRoutes = require("./routes/userroutes");
const productRoutes = require("./routes/productRoutes")
const messageRoute = require("./routes/messageRoute");
const profileRoute = require("./routes/profileRoute");
const ConnectToDB = require("./database/index")
const app = express()
const cors = require("cors");
const socketio = require("socket.io")

app.use(cors({origin: "*"}))
app.use(express.json({extended: "true", limit: "200mb"}))
app.use(express.urlencoded({extended: "true", limit: "200mb"}))
app.use(userRoutes);
app.use(productRoutes);
app.use(messageRoute);
app.use(profileRoute)


const server = app.listen(3500, async()=>{
    try {
        await ConnectToDB()
        console.log("Server is running on port 3500")
    } catch (error) {
        console.log(error)
    }
})

const io = new socketio.Server(server , {
    cors: {
        origin: "*"
    }
})