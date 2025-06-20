import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import environment from "../../infrasrtucture/config/environment";

dotenv.config();

cloudinary.config({
  cloud_name: environment.CLOUD_NAME,
  api_key: environment.API_KEY,
  api_secret: environment.API_SECRET,
});

export default cloudinary;
