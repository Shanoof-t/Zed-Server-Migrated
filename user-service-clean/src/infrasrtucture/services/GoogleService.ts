import { OAuth2Client } from "google-auth-library";
import { IGoogleService } from "../../domain/services/IGoogleService";
import axios, { AxiosResponse } from "axios";

export class GoogleService implements IGoogleService {
  getClient(
    clientId?: string,
    clientSecret?: string,
    redirectUri?: string
  ): OAuth2Client {
    return new OAuth2Client(clientId);
  }

  async getGoogleUser(accessToken: string): Promise<AxiosResponse<any, any>> {
    return await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}
