import kafka from "../../infrasrtucture/kafka/Kafka";
import UserModel from "../../infrasrtucture/database/model/userModel";
import { ISendMessageInfo } from "zedspace-shared-types";
import { parseMessage } from "../../shared/utils/parseKafkaMesssages";
import environment from "../../infrasrtucture/config/environment";
import { UserRepository } from "../../infrasrtucture/repositories/UserRepository";
import { UserProducer } from "../../infrasrtucture/kafka/producers/UserProducer";
import { Container } from "inversify";
import { Model } from "mongoose";
import { User } from "../../domain/entities/User";
import { INTERFACE_TYPE } from "../../shared/utils/appConst";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import IUserProducer from "../../domain/events/producers/IUserProducer";
import IUserConsumerHandler from "../../domain/events/handlers/IUserConsumer";
import UserConsumersHandler from "../../application/events/handlers/UserConsumersHandler";

const { KAFKA_GROUP_ID, KAFKA_TOPIC_SEND_MESSAGE } = environment;

const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID });

const container = new Container();

container
  .bind<Model<User>>(INTERFACE_TYPE.UserModel)
  .toConstantValue(UserModel);

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .toDynamicValue((context) => {
    const model = context.get<Model<User>>(INTERFACE_TYPE.UserModel);
    return new UserRepository(model);
  });

container.bind<IUserProducer>(INTERFACE_TYPE.UserProducer).to(UserProducer);

container
  .bind<IUserConsumerHandler>(INTERFACE_TYPE.UserConsumersHandler)
  .to(UserConsumersHandler);

const userConsumer = container.get<IUserConsumerHandler>(
  INTERFACE_TYPE.UserConsumersHandler
);

export default async function () {
  const topics = [KAFKA_TOPIC_SEND_MESSAGE];

  try {
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message, topic }) => {
        const parsedMessage = parseMessage<ISendMessageInfo>({ message });

        switch (topic) {
          case KAFKA_TOPIC_SEND_MESSAGE:
            await userConsumer.sendMessageHandler(parsedMessage);
            break;
          default:
            console.warn("the unknown topic is occured:", topic);
            break;
        }
      },
    });
  } catch (error) {
    console.error("ERROR HAPPENED IN USER CONSUMER...");
    console.log("THE ERROR:", error);
  }
}
