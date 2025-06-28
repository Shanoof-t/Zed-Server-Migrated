import { ICreateCard } from "zedspace-shared-types";

export default interface IBoardProducer {
  createListProducer(data: {
    body: { name: string };
    boardId: string;
  }): Promise<void>;

  createCardProducer(data: ICreateCard): Promise<void>;
  boardUpdateProducer(data: { boardId: string }): Promise<void>;
}
