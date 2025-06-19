import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import { IUserRegisterInteractor } from "../../../application/interfaces/IUserRegisterInteractor";
import { RegisterUserResponseDTO } from "../../../application/dtos/userRegisterDTO";
import { ISendOtpInteractor } from "../../../application/interfaces/ISendOtpInteractor";
import { IUserSignInInteractor } from "../../../application/interfaces/IUserSignInInteractor";

@injectable()
export class UserRegisterController {
  private registerInteractor: IUserRegisterInteractor;
  private sendOtpInteractor: ISendOtpInteractor;
  private signInInteractor: IUserSignInInteractor;

  constructor(
    @inject(INTERFACE_TYPE.UserRegisterInteractor)
    registerInteractor: IUserRegisterInteractor,
    @inject(INTERFACE_TYPE.SendOtpInteractor)
    sendOtpInteractor: ISendOtpInteractor,
    @inject(INTERFACE_TYPE.UserSignInInteractor)
    signInInteractor: IUserSignInInteractor
  ) {
    this.registerInteractor = registerInteractor;
    this.sendOtpInteractor = sendOtpInteractor;
    this.signInInteractor = signInInteractor;
  }

  async onEmailRegister(req: Request, res: Response) {
    const data: RegisterUserResponseDTO = await this.registerInteractor.execute(
      req.body
    );
    const { refreshToken } = data;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      data,
    });
  }

  async onSendOtp(req: Request, res: Response) {
    const otp = await this.sendOtpInteractor.execute(req.body);
    res.status(200).json(otp);
  }

  async onEmailSignIn(req: Request, res: Response) {
    const data = await this.signInInteractor.execute(req.body);

    const { refreshToken } = data;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(data);
  }

  async onAccessTokenGenerator(req: Request, res: Response) {}

  async onSendResetOtp(req: Request, res: Response) {}

  async onResetPassword(req: Request, res: Response) {}

  async onGoogleAuth(req: Request, res: Response) {}

  async onGithubAuth(req: Request, res: Response) {}
}
