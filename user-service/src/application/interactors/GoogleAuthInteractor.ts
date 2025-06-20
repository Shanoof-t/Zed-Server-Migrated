import { inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IGoogleService } from "../../domain/services/IGoogleService";
import { ITokenManager } from "../../infrasrtucture/security/token/ITokenManager";
import CustomError from "../../shared/utils/CustomError";
import {
  googleAuthRequestDTO,
  googleAuthResponseDTO,
} from "../dtos/googleAuthDTO";
import { IGoogleAuthInteractor } from "../interfaces/IGoogleAuthInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import environment from "../../infrasrtucture/config/environment";
import { User } from "../../domain/entities/User";

export class GoogleAuthInteractor implements IGoogleAuthInteractor {
  private googleService: IGoogleService;
  private repository: IUserRepository;
  private tokenManger: ITokenManager;

  constructor(
    @inject(INTERFACE_TYPE.GoogleService) googleService: IGoogleService,
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.TokenManager) tokenManger: ITokenManager
  ) {
    this.repository = repository;
    this.googleService = googleService;
    this.tokenManger = tokenManger;
  }

  async execute(body: googleAuthRequestDTO): Promise<googleAuthResponseDTO> {
    const client = this.googleService.getClient(environment.GOOGLE_CLIENT_ID);
    if (!body) {
      throw new CustomError("No google credentials provided!", 400);
    }
    const googleUser = await this.googleService.getGoogleUser(
      body.access_token
    );

    const { email, name, picture, id: googleId } = googleUser.data;
    let existUser, user;
    let accessToken, refreshToken;
    existUser = await this.repository.findByEmail(email);
    if (existUser) {
      accessToken = this.tokenManger.generateAccessToken(existUser);
      refreshToken = this.tokenManger.generateRefreshToken(existUser);
      user = existUser;
    } else {
      user = await this.repository.create(
        new User(
          name,
          email,
          undefined,
          picture,
          undefined,
          undefined,
          undefined,
          googleId
        )
      );
      if (!user) throw new CustomError("Auth faild !", 400);
      accessToken = this.tokenManger.generateAccessToken(user);
      refreshToken = this.tokenManger.generateRefreshToken(user);
    }
    if (!user) throw new CustomError("Auth faild !", 400);
    return {
      name: user.name,
      profileImg: user.profileImg!,
      email: user.email,
      accessToken,
      refreshToken,
    };
  }
}
