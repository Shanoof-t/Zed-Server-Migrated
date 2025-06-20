import { inject } from "inversify";
import {
  UpdateProfileRequestDTO,
  UpdateProfileResponeDTO,
} from "../dtos/UpdateProfileDTO";
import { IUpdateProfileInteractor } from "../interfaces/IUpdateUserProfileInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import CustomError from "../../shared/utils/CustomError";

export class UpdateProfileInteractor implements IUpdateProfileInteractor {
  private repository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository
  ) {
    this.repository = repository;
  }

  async execute({
    profileImg,
    userData,
    userId,
  }: UpdateProfileRequestDTO): Promise<UpdateProfileResponeDTO> {
    const { name, bio } = userData;
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (name) {
      const existingUser = await this.repository.findByName(name);
      if (existingUser && existingUser._id!.toString() !== userId.toString()) {
        throw new CustomError("Username already taken", 400);
      }
      user.name = name;
    }
    if (profileImg) {
      user.profileImg = profileImg.path;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    

    return user;
  }
}
