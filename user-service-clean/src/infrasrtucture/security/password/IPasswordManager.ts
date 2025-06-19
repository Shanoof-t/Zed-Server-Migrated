export interface IPasswordManager {
  hash(password: string): Promise<string>;
}
