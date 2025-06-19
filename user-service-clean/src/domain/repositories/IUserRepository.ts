import { User } from "../entities/User";

export interface IUserRepository {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
