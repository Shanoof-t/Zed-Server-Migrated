import { Producer } from "kafkajs";
import IBoardProducer from "../../../domain/events/producer/IBoardProducer";
import { ICreateCard } from "zedspace-shared-types";
import environment from "../../configs/environment";

const {
  KAFKA_TOPIC_CREATE_CARD,
  KAFKA_TOPIC_CREATE_LIST,
  KAFKA_TOPIC_BOARD_UPDATED,
} = environment;

export default class BoardProducer implements IBoardProducer {
  private producer: Producer;

  constructor(producer: Producer) {
    this.producer = producer;
  }

  async boardUpdateProducer(data: { boardId: string }): Promise<void> {
    try {
      await this.producer.send({
        topic: KAFKA_TOPIC_BOARD_UPDATED,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error("BOARD UPDATE PRODUCER HAVE ERROR:", error);
    }
  }

  async createCardProducer(data: ICreateCard): Promise<void> {
    try {
      await this.producer.send({
        topic: KAFKA_TOPIC_CREATE_CARD,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error("CREATE CARD PRODUCER HAVE ERROR:", error);
    }
  }

  async createListProducer(data: {
    body: { name: string };
    boardId: string;
  }): Promise<void> {
    try {
      await this.producer.send({
        topic: KAFKA_TOPIC_CREATE_LIST,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error("CREATE LIST PRODUCER HAVE ERROR:", error);
    }
  }
}
