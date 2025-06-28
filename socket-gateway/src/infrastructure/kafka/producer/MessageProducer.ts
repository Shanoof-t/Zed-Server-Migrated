import { Producer } from "kafkajs";
import { ISendMessageInfo } from "zedspace-shared-types";
import environment from "../../configs/environment";
import IMessageProducer from "../../../domain/events/producer/IMessageProducer";

const { KAFKA_TOPIC_SEND_MESSAGE, KAFKA_TOPIC_READ_MESSAGE } = environment;

export default class MessageProducer implements IMessageProducer {
  private producer: Producer;

  constructor(producer: Producer) {
    this.producer = producer;
  }

  async sendMessageProducer(data: ISendMessageInfo) {
    try {
      await this.producer.send({
        topic: KAFKA_TOPIC_SEND_MESSAGE,
        messages: [{ key: data.channelId, value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error("SEND MESSAGE PRODUCER HAVE ERROR:", error);
    }
  }

  async readMessageProducer(data: {
    channelId: string;
    userId: string;
  }): Promise<void> {
    try {
      await this.producer.send({
        topic: KAFKA_TOPIC_READ_MESSAGE,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.error("READ MESSAGE PRODUCER HAVE ERROR:", error);
    }
  }
}
