import { User } from "../../domain/entities/User";

export interface sendResetOtpRequestDTO extends User {}

export interface sendResetOtpResponseDTO {
  email: string;
  otp: string;
}
