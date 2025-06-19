import { inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordManager } from "../../infrasrtucture/security/password/IPasswordManager";
import { ITokenManager } from "../../infrasrtucture/security/token/ITokenManager";
import {
  UserSignInRequestDTO,
  UserSignInResponseDTO,
} from "../dtos/userSignInDTO";
import { IUserSignInInteractor } from "../interfaces/IUserSignInInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import CustomError from "../../shared/utils/CustomError";

export class UserSignInInteractor implements IUserSignInInteractor {
  private repository: IUserRepository;
  private passwordManager: IPasswordManager;
  private tokenManager: ITokenManager;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.PasswordManager) passwordManager: IPasswordManager,
    @inject(INTERFACE_TYPE.TokenManager) tokenManager: ITokenManager
  ) {
    this.repository = repository;
    this.passwordManager = passwordManager;
    this.tokenManager = tokenManager;
  }

  async execute(input: UserSignInRequestDTO): Promise<UserSignInResponseDTO> {
    const { email, password } = input;

    const user = await this.repository.findByEmail(email);
    if (!user) throw new CustomError("Invalid email or password !", 404);
    if (!password || !user.password)
      throw new CustomError("Invalid credentials", 400);

    const verifyPassword = await this.passwordManager.compare(
      password,
      user.password
    );
    if (!verifyPassword)
      throw new CustomError("Invalid email or password !", 404);

    const accessToken = this.tokenManager.generateAccessToken(user);
    const refreshToken = this.tokenManager.generateRefreshToken(user);

    return {
      _id: user._id!,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      accessToken,
      refreshToken,
    };
  }
}
