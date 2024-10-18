const {Router} = require("express");
const productRoutes = Router()
const ValidateToken = require("../middleware/ValidateToken")

const {listProperty, getAll, deleteProperty, deleteAll, getOneProp, editPost} = require("../controllers/productController");


productRoutes.post("/list", ValidateToken, listProperty)
productRoutes.get("/get-all", getAll)
productRoutes.delete("/del-one/:id", deleteProperty)
productRoutes.delete("/del-all", deleteAll)
productRoutes.get("/get-one/:id", ValidateToken, getOneProp)
productRoutes.patch("/edit-post/:id", editPost)

module.exports = productRoutes
