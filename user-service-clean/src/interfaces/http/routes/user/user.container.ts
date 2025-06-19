// src/interfaces/http/routes/user/user.container.ts

import { Container } from "inversify";
import { Model } from "mongoose";
import UserModel from "../../../../infrasrtucture/database/model/userModel";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../../../infrasrtucture/implementations/UserRepository";
import { IUserRegisterInteractor } from "../../../../application/interfaces/IUserRegisterInteractor";
import { UserRegisterInteractor } from "../../../../application/interactors/UserRegisterInteractor";
import { IHasherEngine } from "../../../../infrasrtucture/crypto/IHasherEngine";
import { BcryptEngine } from "../../../../infrasrtucture/crypto/BcryptEngine";
import { ITokenManager } from "../../../../infrasrtucture/security/token/ITokenManager";
import { TokenManger } from "../../../../infrasrtucture/security/token/tokenManager";
import { IPasswordManager } from "../../../../infrasrtucture/security/password/IPasswordManager";
import { passwordManager } from "../../../../infrasrtucture/security/password/passwordManager";
import { UserRegisterController } from "../../controllers/UserController";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { User } from "../../../../domain/entities/User";
import { ISendOtpInteractor } from "../../../../application/interfaces/ISendOtpInteractor";
import { SendOtpInteractor } from "../../../../application/interactors/SendOtpInteractor";
import { IOtpService } from "../../../../domain/services/IOtpService";
import { OtpService } from "../../../../infrasrtucture/services/OtpService";
import { IMailService } from "../../../../domain/services/IMailService";
import { MailService } from "../../../../infrasrtucture/services/MailService";
import { IUserSignInInteractor } from "../../../../application/interfaces/IUserSignInInteractor";
import { UserSignInInteractor } from "../../../../application/interactors/UserSignInInteractor";

export const userContainer = new Container();

userContainer
  .bind<Model<User>>(INTERFACE_TYPE.UserModel)
  .toConstantValue(UserModel);

userContainer
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .toDynamicValue((context) => {
    const model = context.get<Model<User>>(INTERFACE_TYPE.UserModel);
    return new UserRepository(model);
  });

userContainer
  .bind<IUserRegisterInteractor>(INTERFACE_TYPE.UserRegisterInteractor)
  .to(UserRegisterInteractor);

userContainer.bind<IHasherEngine>(INTERFACE_TYPE.BcryptEngine).to(BcryptEngine);

userContainer.bind<ITokenManager>(INTERFACE_TYPE.TokenManager).to(TokenManger);

userContainer
  .bind<IPasswordManager>(INTERFACE_TYPE.PasswordManager)
  .to(passwordManager);

userContainer
  .bind(INTERFACE_TYPE.UserRegisterController)
  .to(UserRegisterController);

userContainer
  .bind<ISendOtpInteractor>(INTERFACE_TYPE.SendOtpInteractor)
  .to(SendOtpInteractor);

userContainer
  .bind<IUserSignInInteractor>(INTERFACE_TYPE.UserSignInInteractor)
  .to(UserSignInInteractor);

userContainer.bind<IOtpService>(INTERFACE_TYPE.OtpService).to(OtpService);

userContainer.bind<IMailService>(INTERFACE_TYPE.MailService).to(MailService);
