import {
  googleAuthRequestDTO,
  googleAuthResponseDTO,
} from "../dtos/googleAuthDTO";

export interface IGoogleAuthInteractor {
  execute(body: googleAuthRequestDTO): Promise<googleAuthResponseDTO>;
}
