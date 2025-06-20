import { Request, Response } from "express";
import { User } from "../../../domain/entities/User";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import { IGetProfileInteractor } from "../../../application/interfaces/IGetProfileInteractor";
import { IUpdateProfileInteractor } from "../../../application/interfaces/IUpdateUserProfileInteractor";
import environment from "../../../infrasrtucture/config/environment";

@injectable()
export class ProfileController {
  private getProfileInteractor: IGetProfileInteractor;
  private updateProfileInteractor: IUpdateProfileInteractor;
  constructor(
    @inject(INTERFACE_TYPE.GetProfileInteractor)
    getProfileIneractor: IGetProfileInteractor,
    @inject(INTERFACE_TYPE.UpdateProfileInteractor)
    updateProfileInteractor: IUpdateProfileInteractor
  ) {
    this.getProfileInteractor = getProfileIneractor;
    this.updateProfileInteractor = updateProfileInteractor;
  }
  async onGetProfile(req: Request, res: Response) {
    const user = req.user as User;
    const profile = await this.getProfileInteractor.execute({
      _id: user._id as string,
    });
    res.status(200).json(profile);
  }

  async updateProfile(req: Request, res: Response) {
    const user = req.user as User;
    const profileImg = req.file;
    const profile = await this.updateProfileInteractor.execute({
      profileImg,
      userData: user,
      userId: req.body,
    });
    res.status(201).json({ message: "profile Updated", data: profile });
  }

  async logoutUser(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: environment.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  }
}
