import { inject, injectable } from "inversify";
import { User } from "../../domain/entities/User";
import { IPasswordManager } from "../../infrasrtucture/security/password/IPasswordManager";
import { ITokenManager } from "../../infrasrtucture/security/token/ITokenManager";
import { IUserRegisterInteractor } from "../interfaces/IUserRegisterInteractor";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import CustomError from "../../shared/utils/CustomError";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../dtos/userRegisterDTO";

@injectable()
export class UserRegisterInteractor implements IUserRegisterInteractor {
  private repository: IUserRepository;
  private passwordManager: IPasswordManager;
  private tokenManager: ITokenManager;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    repository: IUserRepository,
    @inject(INTERFACE_TYPE.PasswordManager)
    passwordManager: IPasswordManager,
    @inject(INTERFACE_TYPE.TokenManager)
    tokenManager: ITokenManager
  ) {
    this.repository = repository;
    this.passwordManager = passwordManager;
    this.tokenManager = tokenManager;
  }

  async execute(input: RegisterUserRequestDTO) {
    const { email, name, password } = input;
    if (!password) throw new CustomError("Password is required", 400);

    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) throw new CustomError("Email already exists", 409);

    const hashedPass = await this.passwordManager.hash(password);

    const profileImg = User.generateDefaultAvatar(name);
    const user = new User(name, email, hashedPass, profileImg);
    const createdUser = await this.repository.create(user);
    const accessToken = this.tokenManager.generateAccessToken(createdUser);
    const refreshToken = this.tokenManager.generateRefreshToken(createdUser);

    const response: RegisterUserResponseDTO = {
      _id: createdUser._id!,
      name: createdUser.name,
      email: createdUser.email,
      profileImg: createdUser.profileImg,
      accessToken,
      refreshToken,
    };
    return response;
  }
}
