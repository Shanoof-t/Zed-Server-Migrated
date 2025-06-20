import { Container } from "inversify";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { UserController } from "../../controllers/UserController";
import { GetBulkUsersInteractor } from "../../../../application/interactors/GetBulkUsersInteractor";
import { UserRepository } from "../../../../infrasrtucture/implementations/UserRepository";
import { Model } from "mongoose";
import { User } from "../../../../domain/entities/User";
import UserModel from "../../../../infrasrtucture/database/model/userModel";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";

export const container = new Container();

// Models
container
  .bind<Model<User>>(INTERFACE_TYPE.UserModel)
  .toConstantValue(UserModel);

// Repositories
container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .toDynamicValue((context) => {
    const model = context.get<Model<User>>(INTERFACE_TYPE.UserModel);
    return new UserRepository(model);
  });

container.bind(INTERFACE_TYPE.UserController).to(UserController);

container
  .bind(INTERFACE_TYPE.GetBulkUsersInteractor)
  .to(GetBulkUsersInteractor);
