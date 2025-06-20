export interface SendOtpRequestDTO {
  email: string;
}

export interface SendOtpResponseDTO {
  otp: string;
  email: string;
}
