postgres-build:
	docker build -t demo/profile-db -f ./docker/Dockerfile.docker-postgres ./docker/

postgres-up:
	docker run \
	-d \
	--rm \
	-p 5432:5432 \
	-e POSTGRES_USER=you \
	-e POSTGRES_PASSWORD=yoursecretpassword \
	-e POSTGRES_DB=demo \
	demo/profile-db

rabbitmq-build:
	docker build -t demo/profile-mq -f ./docker/Dockerfile.docker-rabbitmq ./docker/

rabbitmq-up:
	docker run \
	-d \
	--rm \
	-p 5672:5672 \
	-p 4369:4369 \
	demo/profile-mq