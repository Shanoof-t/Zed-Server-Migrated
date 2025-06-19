import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import { IUserRegisterInteractor } from "../../../application/interfaces/IUserRegisterInteractor";
import { RegisterUserResponseDTO } from "../../../application/dtos/userRegisterDTO";

@injectable()
export class UserRegisterController {
  private interactor: IUserRegisterInteractor;

  constructor(
    @inject(INTERFACE_TYPE.UserRegisterInteractor)
    interactor: IUserRegisterInteractor
  ) {
    this.interactor = interactor;
  }

  async onEmailRegister(req: Request, res: Response) {
    const data: RegisterUserResponseDTO = await this.interactor.execute(
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
}
