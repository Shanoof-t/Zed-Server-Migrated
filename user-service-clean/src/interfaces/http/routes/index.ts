import express from "express";
import authRoutes from "./auth/auth.routes";
import profileRoutes from "./profile/profile.routes";
import userRoutes from "./user/user.routes";

const router = express.Router();

router.use("/user", authRoutes);
router.use("/", profileRoutes);
router.use("/", userRoutes);
export default router;
