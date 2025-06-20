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
    const {
      name,
      email,
      password,
      profileImg,
      bannerImg,
      bio,
      gitHubId,
      googleId,
      servers,
    } = data;
    const user = await this.db.create({
      name,
      email,
      profileImg,
      password,
      bannerImg,
      bio,
      gitHubId,
      googleId,
      servers,
    });

    if (!user) throw new CustomError("User not created !", 400);

    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.db.findOne({ email: email });
    // if (!user) throw new CustomError("User not created !", 400);
    return user || undefined;
  }
  async findById(id: string): Promise<User> {
    const user = await this.db.findById(id).select("-password");
    if (!user) throw new CustomError("User not created !", 400);
    return user;
  }
  async findByName(name: string): Promise<User> {
    const user = await this.db.findById({ name }).select("-password");
    if (!user) throw new CustomError("User not created !", 400);
    return user;
  }

  async find(userIds: string[]): Promise<User[]> {
    const users = await this.db.find({ _id: { $in: userIds } });
    return users;
  }
}
