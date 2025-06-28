import { ISendMessageInfo } from "zedspace-shared-types";

export default interface IUserConsumerHandler {
  sendMessageHandler(message:ISendMessageInfo): Promise<void>;
}
