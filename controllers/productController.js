const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema")
const cloudinaryConfig = require("../database/cloudinaryconfig");
const createToken = require("../services/sessionService");
const { getOneUser } = require("../controllers/userController")

const listProperty = async(req, res)=>{
    const user = req.user;
    const userId = req.user._id;

   try {
    const {images, houseDetails, description, location, price, role} = req.body;
    // console.log(req.body)
    
    // console.log("PARAMS: ",req.params);
    if(!images || !houseDetails || !location || !price || !description ) {
        return res.status(400).send({message: "All fields are required"})
    }
    
    const seller = req.user._id;
        
    const uploadedImages = []

    for (const image of images) {
      try {
        const handleUpload = await cloudinaryConfig.uploader.upload(image)
        
        const {public_id, secure_url} = handleUpload
        const newImage = {
            public_id,
            secure_url
        }
    uploadedImages.push(newImage)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    const newProperty = await productModel.create({
        images: uploadedImages,
        houseDetails,
        description,
        location,
        price,
        role,
        seller
    })
    console.log("New Prop: ", newProperty)

    await userModel.findOneAndUpdate(userId, {
        $push: { postings: newProperty._id }
    });
    return res.status(200).send({message: "Property has been added", newProperty})
    } catch (error) {
        console.log(error)
    }  
}

const getAll = async(req,res)=>{
    try {
        const properties = await productModel.find({})
        res.send(properties)
    } catch (error) {
        console.log(error)
    }
}

const getOneProp = async(req,res) => {
    try {
        const {id} = req.params;

        const property = await productModel.findOne({_id:id}).populate("seller");
        // console.log("Oneseller", property.seller._id)
        
        if(!property) return res.status(400).send({message: "Property not found"})
    // const poster = req.user
        res.status(200).send({message: "found", property})
    } catch (error) {
        console.log(error)
    }
}

const editPost = async(req, res)=>{
    try {
        const {id} = req.params;

        const property = req.body;

        const updateProperty = await productModel.findOneAndUpdate({_id:id}, property);
        if(!updateProperty) return res.status(400).send({message: "Internal server error"});
        return res.status(200).send({message: "Post has been updated", property})
    } catch (error) {
        console.log(error)
    }
}

const deleteAll =async(req, res)=>{
    try {
        const {id} = req.query
        // using req.query means the id would be passed as a query string /delete-property?id=<id>.
        const delProp = await productModel.find({})
        // console.log("id:", id)
        // if(!delProp) return res.status(400).send({message: "Property not found"})
        const images = delProp.images
       
        await cloudinaryConfig.uploader.destroy({});
        await productModel.deleteMany({})
        res.send({message: "All properties have been deleted"})
    } catch (error) {
        console.log(error)
    }
}

const deleteProperty = async(req, res)=>{
    try{
        const {id} = req.params;
        const property = await productModel.findById(id)
        // console.log("id:", id)
        // console.log("id:", property)
        if(!property) return res.status(400).send({message: "Property not found"})
            console.log('SUCCESS')
        
        const images = property.images;
        for (const image of images) {
            const {public_id} = image;
            await cloudinaryConfig.uploader.destroy(public_id);
        }

        const deleteOne = await productModel.deleteOne({_id: id})
        if(!deleteOne) return res.status(404).send({message: "Property not found"})
            res.send({message: "Property has been deleted"})
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    listProperty, 
    getAll, 
    deleteAll, 
    deleteProperty, 
    getOneProp,
    editPost
}