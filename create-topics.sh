#!/bin/bash

echo "Waiting for Kafka to become healthy..."

until [ "$(docker inspect -f '{{.State.Health.Status}}' kafka)" == "healthy" ]; do
  sleep 2
done

echo "Kafka is healthy. Creating topics..."

# topics=(send_message create_message);

# for topic in $topics;do
#  docker exec kafka kafka-topics --bootstrap-server localhost:9092 --topic $topic --create --partitions 1 --replication-factor 1
# done

docker exec kafka kafka-topics --bootstrap-server localhost:9092 --topic create_message --create --partitions 1 --replication-factor 1
docker exec kafka kafka-topics --bootstrap-server localhost:9092 --topic create_message --create --partitions 1 --replication-factor 1

echo "creating user-service topics..."

echo "Topic creation is successfull..."

echo "Created Topics:"
docker exec kafka kafka-topics --bootstrap-server localhost:9092 --list
