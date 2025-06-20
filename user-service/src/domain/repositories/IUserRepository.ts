import { User } from "../entities/User";

export interface IUserRepository {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User>;
  findByName(name: string): Promise<User>;
  find(userIds: string[]): Promise<User[]>;
}
