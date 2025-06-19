export interface IHasherEngine {
  hash(password: string, salt: number): Promise<string>;
}
