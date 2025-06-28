.PHONY:compose-up-build
compose-up-build:
	docker compose up 

.PHONY:insert-topics
insert-topics:
	./create-topics.sh 