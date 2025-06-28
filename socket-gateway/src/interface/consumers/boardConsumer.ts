import environment from "../../infrastructure/configs/environment";
import { Consumer } from "kafkajs";
import { IBoardEventHandler } from "../../domain/events/handler/IBoardHandler";
import { parseMessage } from "../../shared/parseKafkaMesssages";

const {
  KAFKA_TOPIC_LIST_CREATED,
  KAFKA_TOPIC_CARD_CREATED,
  KAFKA_TOPIC_BOARD_UPDATED,
} = environment;

export class BoardConsumer {
  private consumer: Consumer;
  private eventHandler: IBoardEventHandler;
  constructor(consumer: Consumer, eventHandler: IBoardEventHandler) {
    this.consumer = consumer;
    this.eventHandler = eventHandler;
  }

  async run() {
    await this.consumer.connect();

    await this.consumer.subscribe({
      topics: [
        KAFKA_TOPIC_LIST_CREATED,

        KAFKA_TOPIC_CARD_CREATED,
        KAFKA_TOPIC_BOARD_UPDATED,
      ],
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        switch (topic) {
          case KAFKA_TOPIC_LIST_CREATED:
            const listCreatedMessage = parseMessage<any[]>({ message });
            this.eventHandler.listCreated(listCreatedMessage);
            break;
          case KAFKA_TOPIC_CARD_CREATED:
            const cardCreatedMessage = parseMessage<any[]>({ message });
            this.eventHandler.cardCreated(cardCreatedMessage);
            break;
          case KAFKA_TOPIC_BOARD_UPDATED:
            const boardUpdateMessage = parseMessage<any[]>({ message });
            this.eventHandler.boardUpdated(boardUpdateMessage);
            break;
          default:
            console.warn("the unknown topic is occured:", topic);
            break;
        }
      },
    });
  }
}
