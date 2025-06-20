import axios, { AxiosResponse } from "axios";
import { IGithubService } from "../../domain/services/IGithubService";

export class GithubService implements IGithubService {
  async getAccessToken(
    clientId: string,
    clientSecret: string,
    code: string
  ): Promise<AxiosResponse<{ access_token: string }>> {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      { headers: { Accept: "application/json" } }
    );
    return tokenResponse;
  }
  async getUser(accessToken: string): Promise<
    AxiosResponse<{
      id: string;
      name: string;
      avatar_url: string;
      email: string;
    }>
  > {
    const githubUserResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return githubUserResponse;
  }
}
