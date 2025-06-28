import { DefaultEventsMap, Server } from "socket.io";
import IBoardProducer from "../../domain/events/producer/IBoardProducer";

type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default class BoardSocket {
  private io: IO;
  private boardProducer: IBoardProducer;

  constructor(io: IO, producer: IBoardProducer) {
    this.io = io;
    this.boardProducer = producer;
  }

  init() {
    this.io.on("connection", (socket) => {
      console.log("A user connected to the Board Socket:", socket.id);

      socket.on("joinRoom", (channelId, userId) => {
        socket.join(channelId);
        console.log(`User joined room: ${channelId}, ${userId}`);
      });

      socket.on("onCreateCard", async ({ data, listId, boardId, userId }) => {
        await this.boardProducer.createCardProducer({
          body: data,
          listId,
          userId,
          boardId,
        });
      });

      socket.on("onCreateList", async ({ data, boardId }) => {
        await this.boardProducer.createListProducer({ body: data, boardId });
      });

      socket.on("onCardDrop", async (boardId) => {
        await this.boardProducer.boardUpdateProducer({ boardId });
      });

      socket.on("onChangeListPosition", async (boardId) => {
        await this.boardProducer.boardUpdateProducer({ boardId });
      });

      socket.on("onChangeCardPositionWithInList", async (boardId) => {
        await this.boardProducer.boardUpdateProducer({ boardId });
      });

      socket.on("disconnect", () => {
        console.log("User disconnected from message socket:", socket.id);
      });
    });
  }
}
