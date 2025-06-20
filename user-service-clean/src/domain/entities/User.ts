export class User {
  constructor(
    public name: string,
    public readonly email: string,
    public readonly password?: string,
    public profileImg?: string,
    public  bio?: string,
    public readonly bannerImg?: string,
    public readonly gitHubId?: string,
    public readonly googleId?: string,
    public readonly _id?: string,
    public readonly servers?: string,
    public readonly createdAt?: string
  ) {}

  static generateDefaultAvatar(name: string) {
    return `https://ui-avatars.com/api/?name=${name.charAt(0)}&random`;
  }
}
