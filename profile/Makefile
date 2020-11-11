.PHONY: build
build:
	docker build -t demo/profile .

.PHONY: run
run:
	docker run -d --rm -p 8080:8080 demo/profile

.PHONY: api-up
api-up: api-profile-up

.PHONY: api-profile-up
api-profile-up: 
	docker run \
	--name profile-service \
	-d \
	--rm \
	-p 8080:8080 \
	-e DB_HOST=postgres \
	-e MQ_HOST=rabbitmq \
	--network demo-profile-network \
	demo/profile

.PHONY: api-postgres-up
api-postgres-up:
	docker run \
	--name postgres \
	-d \
	--rm \
	--network demo-profile-network \
	-p 5432:5432 \
	-e POSTGRES_USER=you \
	-e POSTGRES_PASSWORD=yoursecretpassword \
	-e POSTGRES_DB=demo \
	demo/profile-db

.PHONY: api-rabbitmq-up
api-rabbitmq-up:
	docker run \
	--name rabbitmq \
	-d \
	--rm \
	--network demo-profile-network \
	demo/profile-mq

.PHONY: api-network-up
api-network-up:
	docker network create demo-profile-network