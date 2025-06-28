import { IMessageCreated } from "zedspace-shared-types";

export default interface IMessageHandler {
  messageCreated(data: IMessageCreated): void;
  readMessageUpdate(data: { channelId: string; userId: string }): void;
}
