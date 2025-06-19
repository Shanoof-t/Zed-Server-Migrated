import express from "express";
import { Model } from "mongoose";
import { Container } from "inversify";
import { UserRegisterController } from "../controllers/UserController";
import { User } from "../../../domain/entities/User";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import UserModel from "../../../infrasrtucture/database/model/userModel";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../../infrasrtucture/implementations/UserRepository";
import { IUserRegisterInteractor } from "../../../application/interfaces/IUserRegisterInteractor";
import { UserRegisterInteractor } from "../../../application/interactors/userRegisterInteractor";
import { IHasherEngine } from "../../../infrasrtucture/crypto/IHasherEngine";
import { BcryptEngine } from "../../../infrasrtucture/crypto/BcryptEngine";
import { ITokenManager } from "../../../infrasrtucture/security/token/ITokenManager";
import { TokenManger } from "../../../infrasrtucture/security/token/tokenManager";
import { IPasswordManager } from "../../../infrasrtucture/security/password/IPasswordManager";
import { passwordManager } from "../../../infrasrtucture/security/password/passwordManager";
import { catchAsyncMethod } from "../../../shared/utils/catchAsynMethod";

const container = new Container();

container
  .bind<Model<User>>(INTERFACE_TYPE.UserModel)
  .toConstantValue(UserModel);

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .toDynamicValue((context) => {
    const model = context.get<Model<User>>(INTERFACE_TYPE.UserModel);
    return new UserRepository(model);
  });

container
  .bind<IUserRegisterInteractor>(INTERFACE_TYPE.UserRegisterInteractor)
  .to(UserRegisterInteractor);

container.bind<IHasherEngine>(INTERFACE_TYPE.BcryptEngine).to(BcryptEngine);
container.bind<ITokenManager>(INTERFACE_TYPE.TokenManager).to(TokenManger);
container
  .bind<IPasswordManager>(INTERFACE_TYPE.PasswordManager)
  .to(passwordManager);
container
  .bind(INTERFACE_TYPE.UserRegisterController)
  .to(UserRegisterController);

const router = express.Router();

const controller = container.get<UserRegisterController>(
  INTERFACE_TYPE.UserRegisterController
);

router.post(
  "/register",
  catchAsyncMethod(controller.onEmailRegister.bind(controller))
);

export default router;
