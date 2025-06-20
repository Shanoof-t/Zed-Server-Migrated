import {
  getProfileRequestDTO,
  getProfileResponseDTO,
} from "../dtos/getProfileDTO";

export interface IGetProfileInteractor {
  execute(body: getProfileRequestDTO): Promise<getProfileResponseDTO>;
}
