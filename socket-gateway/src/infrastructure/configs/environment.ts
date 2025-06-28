import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default {
  SERVER_PORT: requireEnv("SERVER_PORT"),
  KAFKA_MESSAGE_GROUP_ID: requireEnv("KAFKA_MESSAGE_GROUP_ID"),
  KAFKA_BOARD_GROUP_ID: requireEnv("KAFKA_BOARD_GROUP_ID"),
  KAFKA_BROKERS: requireEnv("KAFKA_BROKERS"),
  ALLOWED_ORIGINS: requireEnv("ALLOWED_ORIGINS"),
  KAFKA_CLIENT_ID: requireEnv("KAFKA_CLIENT_ID"),
  KAFKA_TOPIC_SEND_MESSAGE: requireEnv("KAFKA_TOPIC_SEND_MESSAGE"),
  KAFKA_TOPIC_MESSAGE_CREATED: requireEnv("KAFKA_TOPIC_MESSAGE_CREATED"),
  KAFKA_TOPIC_READ_MESSAGE: requireEnv("KAFKA_TOPIC_READ_MESSAGE"),
  KAFKA_TOPIC_CREATE_LIST: requireEnv("KAFKA_TOPIC_CREATE_LIST"),
  KAFKA_TOPIC_CREATE_CARD: requireEnv("KAFKA_TOPIC_CREATE_CARD"),
  KAFKA_TOPIC_BOARD_UPDATED: requireEnv("KAFKA_TOPIC_BOARD_UPDATED"),
  KAFKA_TOPIC_READ_MESSAGE_UPDATE: requireEnv("KAFKA_TOPIC_READ_MESSAGE_UPDATE"),
  KAFKA_TOPIC_LIST_CREATED: requireEnv("KAFKA_TOPIC_LIST_CREATED"),
  KAFKA_TOPIC_CARD_CREATED: requireEnv("KAFKA_TOPIC_CARD_CREATED"),
};
