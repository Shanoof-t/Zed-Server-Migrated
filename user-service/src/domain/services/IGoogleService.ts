import { OAuth2Client } from "google-auth-library";
import { AxiosResponse } from "axios";

export interface IGoogleService {
  getClient(
    clientId?: string,
    clientSecret?: string,
    redirectUri?: string
  ): OAuth2Client;
  getGoogleUser(accessToken: string): Promise<
    AxiosResponse<{
      email: string;
      name: string;
      picture: string;
      id: string;
    }>
  >;
}
