import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Model } from "mongoose";
import CustomError from "../../shared/utils/CustomError";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
  private db: Model<User>;
  constructor(model: Model<User>) {
    this.db = model;
  }
  async create(data: User): Promise<User> {
    const { name, email, password, profileImg } = data;
    const user = await this.db.create({
      name,
      email,
      profileImg,
      password,
    });

    if (!user) throw new CustomError("User not created !", 400);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.db.findOne({ email: email });
    if (!user) throw new CustomError("User not created !", 400);
    return user;
  }
}
