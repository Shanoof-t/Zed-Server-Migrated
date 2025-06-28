export interface IBoardEventHandler {
  listCreated(lists: any[]): void;
  cardCreated(lists: any[]): void;
  boardUpdated(lists: any[]): void;
}
