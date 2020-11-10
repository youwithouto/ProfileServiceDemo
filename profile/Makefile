build:
	GOOS=linux go build -o app
	docker build -t demo/profile .
	rm -f app

run:
	docker run -d --rm -p 8080:8080 demo/profile