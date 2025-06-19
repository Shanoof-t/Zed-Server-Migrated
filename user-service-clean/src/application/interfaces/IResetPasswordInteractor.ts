import {
  resetPasswordRequestDTO,
  resetPasswordResponseDTO,
} from "../dtos/resetPasswordDTO";

export interface IResetPasswordInteractor {
  execute(body: resetPasswordRequestDTO): Promise<resetPasswordResponseDTO>;
}
