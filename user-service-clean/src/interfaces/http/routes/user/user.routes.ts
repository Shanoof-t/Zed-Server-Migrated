import express from "express";
import { UserController } from "../../controllers/UserController";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { catchAsyncMethod } from "../../../../shared/utils/catchAsynMethod";
import { contaniner } from "../profile/profile.container";

const router = express.Router();

const controller = contaniner.get<UserController>(
  INTERFACE_TYPE.UserController
);

router.post("/", catchAsyncMethod(controller.onGetBulkUsers.bind(controller)));

export default router;
