export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password?: string,
    public profileImg?: string,
    public readonly bio?: string,
    public readonly bannerImg?: string,
    public readonly gitHubId?: string,
    public readonly googleId?: string,
    public readonly _id?: string,
    public readonly servers?: string
  ) {}

  static generateDefaultAvatar(name: string) {
    return `https://ui-avatars.com/api/?name=${name.charAt(0)}&random`;
  }

  getUser() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      password: this.password,
      profileImg: this.profileImg,
      bio: this.bio,
      bannerImg: this.bannerImg,
      gitHubId: this.gitHubId,
      googleId: this.googleId,
      servers: this.servers,
    };
  }
}
