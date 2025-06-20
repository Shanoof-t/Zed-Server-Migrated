import {
  getBulkUsersRequestDTO,
  getBulkUsersResponseDTO,
} from "../dtos/getBulkUsersDTO";

export interface IGetBulkUsersInteractor {
  execute(body: getBulkUsersRequestDTO): Promise<getBulkUsersResponseDTO>;
}
