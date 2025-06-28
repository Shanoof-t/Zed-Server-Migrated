import { IMessageCreated } from "zedspace-shared-types";
import environment from "../../infrastructure/configs/environment";
import { Consumer } from "kafkajs";
import IMessageHandler from "../../domain/events/handler/IMessageHandler";
import { parseMessage } from "../../shared/parseKafkaMesssages";

const { KAFKA_TOPIC_MESSAGE_CREATED, KAFKA_TOPIC_READ_MESSAGE_UPDATE } =
  environment;

export class MessageConsumer {
  private consumer: Consumer;
  private eventHandler: IMessageHandler;

  constructor(consumer: Consumer, eventHandler: IMessageHandler) {
    this.eventHandler = eventHandler;
    this.consumer = consumer;
  }

  async run() {
    await this.consumer.connect();

    await this.consumer.subscribe({
      topics: [KAFKA_TOPIC_MESSAGE_CREATED, KAFKA_TOPIC_READ_MESSAGE_UPDATE],
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        switch (topic) {
          case KAFKA_TOPIC_MESSAGE_CREATED:
            const createdMessageData = parseMessage<IMessageCreated>({
              message,
            });

            this.eventHandler.messageCreated(createdMessageData);
            break;
          case KAFKA_TOPIC_READ_MESSAGE_UPDATE:
            const readMessageData = parseMessage<{
              channelId: string;
              userId: string;
            }>({ message });

            this.eventHandler.readMessageUpdate(readMessageData);
            break;
          default:
            console.warn("the unknown topic is occured:", topic);
            break;
        }
      },
    });
  }
}
