import { Producer } from "kafkajs";
import kafka from "../Kafka";

export default class KafkaProducerManager {
  private producer: Producer;
  private static instance: KafkaProducerManager;
  private connected = false;

  private constructor() {
    this.producer = kafka.producer();
  }

  static getInstance(): KafkaProducerManager {
    if (!this.instance) {
      this.instance = new KafkaProducerManager();
    }
    return this.instance;
  }

  async connect() {
    try {
      if (!this.connected) {
        console.log("producer connecting...");
        await this.producer.connect();
        this.connected = true;
        console.log("producer connected...");
      }
    } catch (error) {
      console.log("Error while connecting producer:", error);
    }
  }

  getProducer(): Producer {
    if (!this.producer) {
      throw new Error("Producer is not created!...");
    }
    return this.producer;
  }
}
