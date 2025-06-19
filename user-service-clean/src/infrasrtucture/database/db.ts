import mongoose from "mongoose";
import environment from "../config/environment";

// Database connection
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(environment.MONGO_URI);
    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
