const dotenv = require("dotenv");
dotenv.config();


const CONNECTION_STRING = process.env.CONNECTION_STRING
const JWT_SECRET = process.env.JWT_SECRET
const API_SECRET = process.env.API_SECRET
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY


module.exports = {CONNECTION_STRING, JWT_SECRET, API_KEY, API_SECRET, CLOUD_NAME}