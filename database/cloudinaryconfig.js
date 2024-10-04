const cloudinaryConfig = require("cloudinary").v2
const {API_KEY, API_SECRET, CLOUD_NAME} = require("../constants/index")

cloudinaryConfig.config({
    api_key: API_KEY,
    api_secret: API_SECRET,
    cloud_name: CLOUD_NAME,
})

module.exports = cloudinaryConfig