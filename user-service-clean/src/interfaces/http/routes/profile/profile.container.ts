import { Container } from "inversify";
import { Model } from "mongoose";
import { INTERFACE_TYPE } from "../../../../shared/utils/appConst";

// controllers
import { ProfileController } from "../../controllers/ProfileController";
import { GetProfileInteractor } from "../../../../application/interactors/GetprofileInteractor";
import { UpdateProfileInteractor } from "../../../../application/interactors/updateProfileInteractor";

export const contaniner = new Container();

contaniner.bind(INTERFACE_TYPE.ProfileController).to(ProfileController);
contaniner.bind(INTERFACE_TYPE.GetProfileInteractor).to(GetProfileInteractor);
contaniner.bind(INTERFACE_TYPE.UpdateProfileInteractor).to(UpdateProfileInteractor);
