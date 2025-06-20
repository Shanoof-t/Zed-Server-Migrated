import { AxiosResponse } from "axios";

export interface IGithubService {
  getAccessToken(
    clientId: string,
    clientSecret: string,
    code: string
  ): Promise<AxiosResponse<{ access_token: string }>>;

  getUser(
    accessToken: string
  ): Promise<
    AxiosResponse<{
      id: string;
      name: string;
      avatar_url: string;
      email: string;
    }>
  >;
}
