import {
  accessTokenGeneratorRequestDTO,
  accessTokenGeneratorResponseDTO,
} from "../dtos/accessTokenGeneratorDTO";

export interface IAccessTokenGeneratorInteractor {
  execute(
    body: accessTokenGeneratorRequestDTO
  ): accessTokenGeneratorResponseDTO
}
