import { Container } from "inversify";
import { Model } from "mongoose";

// Models
import UserModel from "../../../../infrasrtucture/database/model/userModel";

// Domain
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { IOtpService } from "../../../../domain/services/IOtpService";
import { IMailService } from "../../../../domain/services/IMailService";
import { IGoogleService } from "../../../../domain/services/IGoogleService";
import { IGithubService } from "../../../../domain/services/IGithubService";

// Infrastructure
import { UserRepository } from "../../../../infrasrtucture/implementations/UserRepository";
import { BcryptEngine } from "../../../../infrasrtucture/crypto/BcryptEngine";
import { IHasherEngine } from "../../../../infrasrtucture/crypto/IHasherEngine";
import { TokenManger } from "../../../../infrasrtucture/security/token/tokenManager";
import { ITokenManager } from "../../../../infrasrtucture/security/token/ITokenManager";
import { passwordManager } from "../../../../infrasrtucture/security/password/passwordManager";
import { IPasswordManager } from "../../../../infrasrtucture/security/password/IPasswordManager";
import { OtpService } from "../../../../infrasrtucture/services/OtpService";
import { MailService } from "../../../../infrasrtucture/services/MailService";
import { GoogleService } from "../../../../infrasrtucture/services/GoogleService";
import { GithubService } from "../../../../infrasrtucture/services/GithubService";

// Application - Interactors
import { IUserRegisterInteractor } from "../../../../application/interfaces/IUserRegisterInteractor";
import { UserRegisterInteractor } from "../../../../application/interactors/UserRegisterInteractor";
import { ISendOtpInteractor } from "../../../../application/interfaces/ISendOtpInteractor";
import { SendOtpInteractor } from "../../../../application/interactors/SendOtpInteractor";
import { IResendOtpInteractor } from "../../../../application/interfaces/IResendOtpInteractor";
import { ResendOtpInteractor } from "../../../../application/interactors/ResendOtpInteractor";
import { IUserSignInInteractor } from "../../../../application/interfaces/IUserSignInInteractor";
import { UserSignInInteractor } from "../../../../application/interactors/UserSignInInteractor";
import { IAccessTokenGeneratorInteractor } from "../../../../application/interfaces/IAccessTokenGeneratorInteractor";
import { accessTokenGeneratorInteractor } from "../../../../application/interactors/accessTokenGeneratorInteractor";
import { IResetPasswordInteractor } from "../../../../application/interfaces/IResetPasswordInteractor";
import { ResetPasswordInteractor } from "../../../../application/interactors/ResetPasswordInteractor";
import { IGoogleAuthInteractor } from "../../../../application/interfaces/IGoogleAuthInteractor";
import { GoogleAuthInteractor } from "../../../../application/interactors/GoogleAuthInteractor";
import { IGithubAuthInteractor } from "../../../../application/interfaces/IGithubAuthInteractor";
import { GithubAuthInteractor } from "../../../../application/interactors/GithubAuthInteractor";

// Controller
import { AuthController } from "../../controllers/AuthController";

import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";

export const userContainer = new Container();

// Models
userContainer
  .bind<Model<User>>(INTERFACE_TYPE.UserModel)
  .toConstantValue(UserModel);

// Repositories
userContainer
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .toDynamicValue((context) => {
    const model = context.get<Model<User>>(INTERFACE_TYPE.UserModel);
    return new UserRepository(model);
  });

// Controllers
userContainer.bind(INTERFACE_TYPE.AuthController).to(AuthController);

// Crypto & Security
userContainer.bind<IHasherEngine>(INTERFACE_TYPE.BcryptEngine).to(BcryptEngine);
userContainer
  .bind<IPasswordManager>(INTERFACE_TYPE.PasswordManager)
  .to(passwordManager);
userContainer.bind<ITokenManager>(INTERFACE_TYPE.TokenManager).to(TokenManger);

// Services
userContainer.bind<IOtpService>(INTERFACE_TYPE.OtpService).to(OtpService);
userContainer.bind<IMailService>(INTERFACE_TYPE.MailService).to(MailService);
userContainer
  .bind<IGoogleService>(INTERFACE_TYPE.GoogleService)
  .to(GoogleService);
userContainer
  .bind<IGithubService>(INTERFACE_TYPE.GithubService)
  .to(GithubService);

// Interactors
userContainer
  .bind<IAccessTokenGeneratorInteractor>(
    INTERFACE_TYPE.AccessTokenGeneratorInteractor
  )
  .to(accessTokenGeneratorInteractor);

userContainer
  .bind<IGithubAuthInteractor>(INTERFACE_TYPE.GithubAuthInteractor)
  .to(GithubAuthInteractor);

userContainer
  .bind<IGoogleAuthInteractor>(INTERFACE_TYPE.GoogleAuthInteractor)
  .to(GoogleAuthInteractor);

userContainer
  .bind<IResetPasswordInteractor>(INTERFACE_TYPE.ResetPasswordInteractor)
  .to(ResetPasswordInteractor);

userContainer
  .bind<IResendOtpInteractor>(INTERFACE_TYPE.ResendOtpInteractor)
  .to(ResendOtpInteractor);

userContainer
  .bind<ISendOtpInteractor>(INTERFACE_TYPE.SendOtpInteractor)
  .to(SendOtpInteractor);

userContainer
  .bind<IUserRegisterInteractor>(INTERFACE_TYPE.UserRegisterInteractor)
  .to(UserRegisterInteractor);

userContainer
  .bind<IUserSignInInteractor>(INTERFACE_TYPE.UserSignInInteractor)
  .to(UserSignInInteractor);
