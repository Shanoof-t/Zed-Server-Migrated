import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "../dtos/userRegisterDTO";

export interface IUserRegisterInteractor {
  execute(input: RegisterUserRequestDTO): Promise<RegisterUserResponseDTO>;
}
