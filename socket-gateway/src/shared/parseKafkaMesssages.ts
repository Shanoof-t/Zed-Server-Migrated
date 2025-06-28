import { KafkaMessage } from "kafkajs";

export const parseMessage = <T>({ message }: { message: KafkaMessage }): T => {
  const messageValue = message.value?.toString();

  if (!messageValue) {
    console.log("MESSAGE VALUE IS UNDEFINED");
    throw new Error("MESSAGE VALUE IS UNDEFINED...");
  }

  const parsedMessage = JSON.parse(messageValue);

  if (!parsedMessage) {
    console.log("Message Can't parse");
    throw new Error("MESSAGE IS NOT PARSED...");
  }
  
  return parsedMessage;
};
