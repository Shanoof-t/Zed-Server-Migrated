import { Request, Response } from "express";
import { inject } from "inversify";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import { IGetBulkUsersInteractor } from "../../../application/interfaces/IGetBulkUsersInteractor";

export class UserController {
  private getBulkUsersInteractor: IGetBulkUsersInteractor;
  constructor(
    @inject(INTERFACE_TYPE.GetBulkUsersInteractor)
    getBulkUsersInteractor: IGetBulkUsersInteractor
  ) {
    this.getBulkUsersInteractor = getBulkUsersInteractor;
  }

  async onGetBulkUsers(req: Request, res: Response) {
    const body = req.body;
    const users = await this.getBulkUsersInteractor.execute({ userIds: body });
    res.status(201).json({
      status: "success",
      message: "user fetched successfully based on the channel",
      data: users,
    });
  }
}
