import { IMessageCreated } from "zedspace-shared-types";
import IMessageHandler from "../../domain/events/handler/IMessageHandler";
import { DefaultEventsMap, Server } from "socket.io";

type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export class MessageHandler implements IMessageHandler {
  private io: IO;

  constructor(io: IO) {
    this.io = io;
  }

  messageCreated(data: IMessageCreated): void {
    const {
      sender,
      message: {
        channelId,
        content,
        fileUrl,
        readBy,
        type,
        _id,
        createdAt,
        senderId,
      },
    } = data;

    this.io.to(channelId.toString()).emit("receiveMessage", {
      _id: _id,
      senderId,
      content,
      fileUrl,
      type,
      channelId,
      readBy: readBy,
      createdAt,
    });

    this.io.to(channelId.toString()).emit("newUnreadMessage", {
      channelId,
      count: 1,
      senderId: sender._id,
    });
  }
  readMessageUpdate(data: { channelId: string; userId: string }): void {
    const { channelId, userId } = data;
    this.io.to(channelId).emit("messagesRead", { channelId, userId });
  }
}
