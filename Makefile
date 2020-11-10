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