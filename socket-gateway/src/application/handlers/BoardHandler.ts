import { IBoardEventHandler } from "../../domain/events/handler/IBoardHandler";
import { DefaultEventsMap, Server } from "socket.io";

type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default class BoardEventHandler implements IBoardEventHandler {
  private io: IO;

  constructor(io: IO) {
    this.io = io;
  }

  boardUpdated(lists: any[]): void {
    this.io.emit("onUpdateList", lists);
  }

  cardCreated(lists: any[]): void {
    this.io.emit("onUpdateList", lists);
  }
  listCreated(lists: any[]): void {
    this.io.emit("onUpdateList", lists);
  }
}
