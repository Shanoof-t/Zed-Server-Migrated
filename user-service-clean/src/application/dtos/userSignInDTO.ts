export interface UserSignInRequestDTO {
  email: string;
  password: string;
}

export interface UserSignInResponseDTO {
  _id: string;
  name: string;
  email: string;
  profileImg?: string;
  accessToken: string;
  refreshToken: string;
}
