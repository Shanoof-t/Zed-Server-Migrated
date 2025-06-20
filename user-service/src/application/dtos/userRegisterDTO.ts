export interface RegisterUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResponseDTO {
  _id: string;
  name: string;
  email: string;
  profileImg?: string;
  accessToken: string;
  refreshToken: string;
}
