import {
  UserSignInRequestDTO,
  UserSignInResponseDTO,
} from "../dtos/userSignInDTO";

export interface IUserSignInInteractor {
  execute(input: UserSignInRequestDTO): Promise<UserSignInResponseDTO>;
}
