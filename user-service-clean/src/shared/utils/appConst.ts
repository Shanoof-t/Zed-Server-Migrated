export const INTERFACE_TYPE = {
  UserRepository: Symbol.for("UserRepository"),
  UserRegisterInteractor: Symbol.for("UserRegisterInteractor"),
  UserRegisterController: Symbol.for("UserRegisterController"),
  BcryptEngine: Symbol.for("BcryptEngine"),
  TokenManager: Symbol.for("TokenManager"),
  PasswordManager: Symbol.for("PasswordManager"),
  UserModel: Symbol.for("UserModel"),
  SendOtpInteractor: Symbol.for("SendOtpInteractor"),
  OtpService: Symbol.for("OtpService"),
  MailService: Symbol.for("MailService"),
  UserSignInInteractor: Symbol.for("UserSignInInteractor"),
  AccessTokenGeneratorInteractor: Symbol.for("AccessTokenGeneratorInteractor"),
};
