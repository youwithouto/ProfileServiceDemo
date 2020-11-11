# Build stage
FROM golang:1.15-alpine AS build-stage
WORKDIR /go/src/app
COPY . .
RUN go get -d -v ./...
RUN GOOS=linux go build -o demo

# Execution stage
FROM alpine
WORKDIR /
COPY --from=build-stage /go/src/app/demo /
ENTRYPOINT ["/demo"]