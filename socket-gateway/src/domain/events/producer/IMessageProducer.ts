import { ISendMessageInfo } from "zedspace-shared-types";

export default interface IMessageProducer {
  sendMessageProducer(data: ISendMessageInfo): Promise<void>;
  readMessageProducer(data: {
    channelId: string;
    userId: string;
  }): Promise<void>;
}
