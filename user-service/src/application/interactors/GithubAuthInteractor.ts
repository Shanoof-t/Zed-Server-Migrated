import { inject, injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IGithubService } from "../../domain/services/IGithubService";
import { ITokenManager } from "../../infrasrtucture/security/token/ITokenManager";
import CustomError from "../../shared/utils/CustomError";
import {
  githubAuthRequestDTO,
  githubAuthResponseDTO,
} from "../dtos/githubAuthDTO";
import { IGithubAuthInteractor } from "../interfaces/IGithubAuthInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import environment from "../../infrasrtucture/config/environment";
import { User } from "../../domain/entities/User";

@injectable()
export class GithubAuthInteractor implements IGithubAuthInteractor {
  private gitHubService: IGithubService;
  private repository: IUserRepository;
  private tokenManager: ITokenManager;

  constructor(
    @inject(INTERFACE_TYPE.GithubService) gitHubService: IGithubService,
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.UserRepository) tokenManager: ITokenManager
  ) {
    this.gitHubService = gitHubService;
    this.repository = repository;
    this.tokenManager = tokenManager;
  }

  async execute(body: githubAuthRequestDTO): Promise<githubAuthResponseDTO> {
    if (!body.code) {
      throw new CustomError("No GitHub code provided!", 400);
    }

    const tokenResponse = await this.gitHubService.getAccessToken(
      environment.GITHUB_CLIENT_ID,
      environment.GITHUB_CLIENT_SECRET,
      body.code
    );

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      throw new CustomError("Failed to retrieve GitHub access token", 400);
    }

    // Fetch user data from GitHub
    const githubUserResponse = await this.gitHubService.getUser(accessToken);

    const {
      id: gitHubId,
      name,
      avatar_url: profileImg,
      email,
    } = githubUserResponse.data;

    if (!email)
      throw new CustomError("Email is privet Use another methode !", 404);

    let existingUser, user;
    let refreshToken;
    existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      refreshToken = this.tokenManager.generateRefreshToken(existingUser);
      user = existingUser;
    } else {
      user = await this.repository.create(
        new User(
          name,
          email,
          undefined,
          profileImg,
          undefined,
          undefined,
          gitHubId,
          undefined
        )
      );

      if (!user) throw new CustomError("Authentication failed!", 400);
      refreshToken = this.tokenManager.generateRefreshToken(user);
    }

    return {
      name: user.name,
      profileImg: user.profileImg!,
      email: user.email,
      accessToken: this.tokenManager.generateAccessToken(user),
      refreshToken,
    };
  }
}
