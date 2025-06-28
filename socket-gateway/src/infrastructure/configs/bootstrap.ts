import BoardEventHandler from "../../application/handlers/BoardHandler";
import { MessageHandler } from "../../application/handlers/MessageHandler";
import { BoardConsumer } from "../../interface/consumers/boardConsumer";
import { MessageConsumer } from "../../interface/consumers/messageConsumer";
import BoardSocket from "../../interface/socket/BoardSocket";
import MessageSocket from "../../interface/socket/MessageSocket";
import kafka from "../kafka/kafka";
import BoardProducer from "../kafka/producer/BoardProducer";
import ProducerManager from "../kafka/producer/KafkaProducerManager";
import MessageProducer from "../kafka/producer/MessageProducer";
import createServer from "../webserver/server";
import environment from "./environment";
import Socket from "./Socket";

const { KAFKA_MESSAGE_GROUP_ID, KAFKA_BOARD_GROUP_ID } = environment;

// start - dependencies

// ui
const server = createServer();
const socket = new Socket(server);
const io = socket.init();

// consumers
const massageConsumerGroup = kafka.consumer({
  groupId: KAFKA_MESSAGE_GROUP_ID,
});

const boardConsumerGroup = kafka.consumer({
  groupId: KAFKA_BOARD_GROUP_ID,
});

// message consumer
const messageHandler = new MessageHandler(io);
const messageConsumer = new MessageConsumer(
  massageConsumerGroup,
  messageHandler
);

// board consumer
const boardHandler = new BoardEventHandler(io);
const boardConsumer = new BoardConsumer(boardConsumerGroup, boardHandler);

// producer dependencies
const producerManager = new ProducerManager();

// message producer
const messageProducer = new MessageProducer(producerManager.getProducer());
const messageSocket = new MessageSocket(io, messageProducer);

// board producer
const boardProducer = new BoardProducer(producerManager.getProducer());
const boardSocket = new BoardSocket(io, boardProducer);

async function init() {
  await messageConsumer.run();
  await boardConsumer.run();
  await producerManager.connect();
  messageSocket.init();
  boardSocket.init();

  return server;
}

export default { init };
