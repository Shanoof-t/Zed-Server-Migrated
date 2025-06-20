import { Container } from "inversify";
import { Model } from "mongoose";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";

// controllers
import { ProfileController } from "../../controllers/ProfileController";
import { GetProfileInteractor } from "../../../../application/interactors/GetprofileInteractor";
import { UpdateProfileInteractor } from "../../../../application/interactors/updateProfileInteractor";
import { User } from "../../../../domain/entities/User";
import UserModel from "../../../../infrasrtucture/database/model/userModel";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../../../infrasrtucture/implementations/UserRepository";

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

container.bind(INTERFACE_TYPE.ProfileController).to(ProfileController);
container.bind(INTERFACE_TYPE.GetProfileInteractor).to(GetProfileInteractor);
container.bind(INTERFACE_TYPE.UpdateProfileInteractor).to(UpdateProfileInteractor);
