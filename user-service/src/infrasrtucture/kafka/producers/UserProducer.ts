import KafkaProducerManager from "./KafkaProducerManager";
import environment from "../../config/environment";
import IUserProducer from "../../../domain/events/producers/IUserProducer"; 
import {  ISendMessageInfo } from "zedspace-shared-types";
import { User } from "../../../domain/entities/User";

export class UserProducer implements IUserProducer {
  private producer = KafkaProducerManager.getInstance().getProducer();

  async publishCreateMessage(
    sender: User,
    msgInfo: ISendMessageInfo
  ): Promise<void> {
    try {
      console.log("CRAETE MESSAGE PRODUCER IS RUNNING....");
      await this.producer.send({
        topic: environment.KAFKA_TOPIC_CREATE_MESSAGE,
        messages: [{ value: JSON.stringify({ sender, msgInfo }) }],
      });
      console.log("CREATE MESSAGE IS PUBLISHED...");
    } catch (error) {
      console.error("CREATE MESSAGE PRODUCER HAVE ERROR:", error);
    }
  }
}
