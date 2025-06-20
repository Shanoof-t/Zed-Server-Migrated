import { inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import {
  getBulkUsersRequestDTO,
  getBulkUsersResponseDTO,
} from "../dtos/getBulkUsersDTO";
import { IGetBulkUsersInteractor } from "../interfaces/IGetBulkUsersInteractor";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";

export class GetBulkUsersInteractor implements IGetBulkUsersInteractor {
  private repository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository
  ) {
    this.repository = repository;
  }

  async execute(
    body: getBulkUsersRequestDTO
  ): Promise<getBulkUsersResponseDTO> {
    const users = await this.repository.find(body.userIds);
    return {
      users,
    };
  }
}
