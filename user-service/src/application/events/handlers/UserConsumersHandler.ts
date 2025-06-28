import { ISendMessageInfo } from "zedspace-shared-types";
import IUserConsumerHandler from "../../../domain/events/handlers/IUserConsumer";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../../../shared/utils/appConst";
import IUserProducer from "../../../domain/events/producers/IUserProducer";

@injectable()
export default class UserConsumersHandler implements IUserConsumerHandler {
  private repository: IUserRepository;
  private producer: IUserProducer;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.UserProducer) producer: IUserProducer
  ) {
    this.repository = repository;
    this.producer = producer;
  }

  async sendMessageHandler(message: ISendMessageInfo): Promise<void> {
    const sender = await this.repository.findById(message.senderId._id);

    if (!sender) return;

    await this.producer.publishCreateMessage(sender, message);
  }
}
