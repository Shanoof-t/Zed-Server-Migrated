export interface IUserRegisterInteractor {
  execute(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<any>;
}
