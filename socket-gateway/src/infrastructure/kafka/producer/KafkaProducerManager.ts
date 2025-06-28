import kafka from "../kafka";
import { Producer } from "kafkajs";

export default class ProducerManager {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  async connect() {
    try {
      console.log("KAKFA PRODUCER IS CONNECTING...");
      await this.producer.connect();
      console.log("KAKFA PRODUCER IS CONNECTED...");
    } catch (error) {
      console.log("KAFKA PRODUCER CONNECTION GOT ERROR...", error);
    }
  }

  getProducer() {
    return this.producer;
  }
}
