import express from "express";
import { userContainer } from "./user.container";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { UserRegisterController } from "../../controllers/UserController";
import { catchAsyncMethod } from "../../../../shared/utils/catchAsynMethod";

const router = express.Router();

const controller = userContainer.get<UserRegisterController>(
  INTERFACE_TYPE.UserRegisterController
);

router.post(
  "/otp-request",
  catchAsyncMethod(controller.onSendOtp.bind(controller))
);

router.post(
  "/register",
  catchAsyncMethod(controller.onEmailRegister.bind(controller))
);

router.post(
  "/signin",
  catchAsyncMethod(controller.onEmailSignIn.bind(controller))
);

router.post(
  "/get-access-token",
  catchAsyncMethod(controller.onAccessTokenGenerator.bind(controller))
);

router.post(
  "/reset-otp-request",
  catchAsyncMethod(controller.onSendResetOtp.bind(controller))
);

router.post(
  "/reset-password",
  catchAsyncMethod(controller.onResetPassword.bind(controller))
);

export default router;
