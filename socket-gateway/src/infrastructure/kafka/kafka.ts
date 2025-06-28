import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import environment from "../configs/environment";

dotenv.config();

const brokers = environment.KAFKA_BROKERS.split(",");

const kafka = new Kafka({
  clientId: environment.KAFKA_CLIENT_ID,
  brokers: brokers,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

export default kafka;
