import { inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordManager } from "../../infrasrtucture/security/password/IPasswordManager";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import {
  resetPasswordRequestDTO,
  resetPasswordResponseDTO,
} from "../dtos/resetPasswordDTO";
import { IResetPasswordInteractor } from "../interfaces/IResetPasswordInteractor";
import CustomError from "../../shared/utils/CustomError";
import { User } from "../../domain/entities/User";

export class ResetPasswordInteractor implements IResetPasswordInteractor {
  private repository: IUserRepository;
  private passwordManager: IPasswordManager;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    repository: IUserRepository,
    @inject(INTERFACE_TYPE.PasswordManager)
    passwordManager: IPasswordManager
  ) {
    this.repository = repository;
    this.passwordManager = passwordManager;
  }

  async execute(
    body: resetPasswordRequestDTO
  ): Promise<resetPasswordResponseDTO> {
    const { email, password } = body;
    const user = await this.repository.findByEmail(email);
    if (!user) throw new CustomError("User not found !", 404);
    if (!password) throw new CustomError("Password is required", 400);
    const hashedPassword = await this.passwordManager.hash(password);
    return new User(user.name, email, hashedPassword);
  }
}
