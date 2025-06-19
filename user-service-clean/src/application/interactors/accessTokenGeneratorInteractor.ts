import { inject } from "inversify";
import {
  accessTokenGeneratorRequestDTO,
  accessTokenGeneratorResponseDTO,
} from "../dtos/accessTokenGeneratorDTO";
import { IAccessTokenGeneratorInteractor } from "../interfaces/IAccessTokenGeneratorInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { ITokenManager } from "../../infrasrtucture/security/token/ITokenManager";
import CustomError from "../../shared/utils/CustomError";

export class accessTokenGeneratorInteractor
  implements IAccessTokenGeneratorInteractor
{
  private tokenManager: ITokenManager;

  constructor(
    @inject(INTERFACE_TYPE.TokenManager) tokenManager: ITokenManager
  ) {
    this.tokenManager = tokenManager;
  }

  execute(
    body: accessTokenGeneratorRequestDTO
  ): accessTokenGeneratorResponseDTO {
    const payload = this.tokenManager.verifyRefreshToken(body.refreshToken);
    if (!payload) throw new CustomError("Unauthorized !", 401);
    const newAccessToken = this.tokenManager.generateAccessToken(payload);
    return { accessToken: newAccessToken };
  }
}
