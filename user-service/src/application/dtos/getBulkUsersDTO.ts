import { User } from "../../domain/entities/User";

export interface getBulkUsersRequestDTO {
  userIds: string[];
}

export interface getBulkUsersResponseDTO {
  users: User[];
}