export interface googleAuthRequestDTO {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
  prompt?: string;
}

export interface googleAuthResponseDTO {
  name: string;
  profileImg: string;
  email: string;
  accessToken: string;
  refreshToken:string
}
