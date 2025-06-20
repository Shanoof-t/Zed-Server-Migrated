import express from "express";
import { userContainer } from "./user.container";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { AuthController } from "../../controllers/AuthController";
import { catchAsyncMethod } from "../../../../shared/utils/catchAsynMethod";

const router = express.Router();

const controller = userContainer.get<AuthController>(
  INTERFACE_TYPE.AuthController
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

router.post(
  "/auth/google",
  catchAsyncMethod(controller.onGoogleAuth.bind(controller))
);

router.post(
  "/auth/github/callback",
  catchAsyncMethod(controller.onGithubAuth.bind(controller))
);

export default router;
