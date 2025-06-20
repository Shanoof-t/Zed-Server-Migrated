import { Container } from "inversify";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";
import { UserController } from "../../controllers/UserController";
import { GetBulkUsersInteractor } from "../../../../application/interactors/GetBulkUsersInteractor";

export const container = new Container();

container.bind(INTERFACE_TYPE.UserController).to(UserController);
container
  .bind(INTERFACE_TYPE.GetBulkUsersInteractor)
  .to(GetBulkUsersInteractor);
