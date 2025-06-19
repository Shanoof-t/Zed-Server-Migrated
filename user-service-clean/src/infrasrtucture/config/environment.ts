import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.SERVER_PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  SERVER_PORT: process.env.SERVER_PORT as string,
  EMAIL: process.env.EMAIL as string,
  APP_PASSWORD: process.env.APP_PASSWORD as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
};
