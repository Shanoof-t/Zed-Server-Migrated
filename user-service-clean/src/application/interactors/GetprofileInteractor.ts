import { inject, injectable } from "inversify";
import {
  getProfileRequestDTO,
  getProfileResponseDTO,
} from "../dtos/getProfileDTO";
import { IGetProfileInteractor } from "../interfaces/IGetProfileInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

@injectable()
export class GetProfileInteractor implements IGetProfileInteractor {
  private repository: IUserRepository;
  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository
  ) {
    this.repository = repository;
  }
  async execute(body: getProfileRequestDTO): Promise<getProfileResponseDTO> {
    const profile = await this.repository.findById(body._id!);
    if (!profile) {
      throw new Error("User not found");
    }
    return profile;
  }
}
