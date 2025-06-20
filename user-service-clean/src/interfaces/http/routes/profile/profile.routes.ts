import express, { Router } from "express";
import { container } from "./profile.container";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { ProfileController } from "../../controllers/ProfileController";
import { catchAsyncMethod } from "../../../../shared/utils/catchAsynMethod";
import { userAuth } from "../../middlewares/userAuth";
import upload from "../../middlewares/imageUploadingMiddleware";

const router: Router = express.Router();

const controller = container.get<ProfileController>(
  INTERFACE_TYPE.ProfileController
);

router.get(
  "/profile",
  userAuth,
  catchAsyncMethod(controller.onGetProfile.bind(controller))
);

router.put(
  "/profile/update",
  upload.single("profileImg"),
  userAuth,
  catchAsyncMethod(controller.updateProfile.bind(controller))
);

router.post(
  "/logout",
  userAuth,
  catchAsyncMethod(controller.logoutUser.bind(controller))
);

export default router;
