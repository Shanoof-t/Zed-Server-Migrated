import { User } from "../../domain/entities/User";

export interface getProfileRequestDTO {
  _id: string;
}   

export interface getProfileResponseDTO extends User {}
