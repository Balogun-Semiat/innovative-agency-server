const cloudinaryConfig = require("../database/cloudinaryconfig");
const productModel = require("../models/productSchema");
const userModel = require("../models/userSchema")


async function getUserProfile(req, res){
    try {
        const userId = req.user.id;
        // console.log("USER:",userId)
        const user = await userModel.findById(userId).populate("postings").populate("messages");
        if(!user) return res.status(404).send({message: "user not found"})
            // console.log(typeof user)
        return res.status(200).send({message: "User found", user})

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error retrieving user profile" });
    }
}

const deleteEverything = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Find all posts by the user
        const userPosts = await productModel.find({ seller: userId });
        
        // If the user has posted any properties, delete the images and the posts
        if (userPosts.length > 0) {
            for (const post of userPosts) {
                const images = post.images;
                
                // Loop through and delete images from Cloudinary
                for (const image of images) {
                    const { public_id } = image;
                    if (public_id) {
                        await cloudinaryConfig.uploader.destroy(public_id);
                    }
                }
            }
            
            // Delete all posts associated with the user
            await productModel.deleteMany({ seller: userId });
        }

        // Finally, delete the user
        await userModel.findByIdAndDelete(userId);

        return res.status(200).send({ message: "User and all associated posts have been deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "An error occurred while deleting everything" });
    }
};


module.exports = { 
    getUserProfile, 
    deleteEverything 
};