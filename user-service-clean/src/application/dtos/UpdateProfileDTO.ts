import { User } from "../../domain/entities/User";

export interface UpdateProfileRequestDTO {
  userData: User;
  userId: string;
  profileImg: Express.Multer.File | undefined;
}

export interface UpdateProfileResponeDTO extends User {}
