import { connectDB } from "../database/db";
import runConsumers from "../../interfaces/consumers";
import KafkaProducerManager from "../kafka/producers/KafkaProducerManager";

async function init() {
  await connectDB();
  await KafkaProducerManager.getInstance().connect();
  await runConsumers();
}

export default { init };
