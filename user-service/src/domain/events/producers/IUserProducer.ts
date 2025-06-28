import { ISendMessageInfo } from "zedspace-shared-types";
import { User } from "../../entities/User";

export default interface IUserProducer {
  publishCreateMessage(sender: User, msgInfo: ISendMessageInfo): Promise<void>;
}
