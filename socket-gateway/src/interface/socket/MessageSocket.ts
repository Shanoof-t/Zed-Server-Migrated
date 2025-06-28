import { DefaultEventsMap, Server } from "socket.io";
import IMessageProducer from "../../domain/events/producer/IMessageProducer";
import { ISendMessageInfo } from "zedspace-shared-types";

type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export default class MessageSocket {
  private io: IO;
  private messageProducer: IMessageProducer;

  constructor(io: IO, producer: IMessageProducer) {
    this.io = io;
    this.messageProducer = producer;
  }

  init() {
    this.io.on("connection", (socket) => {
      console.log("A user connected to the Message Socket:", socket.id);

      socket.on("joinRoom", (channelId, userId) => {
        socket.join(channelId);
        console.log(`User joined room: ${channelId}, ${userId}`);
      });

      socket.on("sendMessage", async (data: ISendMessageInfo) => {
        try {
          await this.messageProducer.sendMessageProducer(data);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });

      socket.on("readMessage", async (data) => {
        try {
          await this.messageProducer.readMessageProducer(data);
        } catch (error) {
          console.error("Error marking messages as read:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected from message socket:", socket.id);
      });
    });
  }
}
