import {
  UpdateProfileRequestDTO,
  UpdateProfileResponeDTO,
} from "../dtos/UpdateProfileDTO";

export interface IUpdateProfileInteractor {
  execute(body: UpdateProfileRequestDTO): Promise<UpdateProfileResponeDTO>;
}
