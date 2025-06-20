export interface githubAuthRequestDTO {
  code: string;
}

export interface githubAuthResponseDTO {
  name: string;
  profileImg: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
