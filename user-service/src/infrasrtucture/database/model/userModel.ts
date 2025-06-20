import mongoose, { Schema } from "mongoose";
import { User } from "../../../domain/entities/User";  

const userSchema: Schema<User> = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImg: { type: String },
    bio: { type: String },
    bannerImg: { type: String },
    gitHubId: { type: String },
    googleId: { type: String },
    servers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Server" }],
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;