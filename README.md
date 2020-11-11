# Profile Service 

A demo application for React and Microservices

The detailed requirements are given in: [doc/requirement_original.md](doc/requirement_original.md)

## Components

This repository contains two executable components:
- Profile API service (`./profile`)
- Profile UI (`./profile-ui`)

and other related materials:
- The original requirements doc (`./doc`)
- Docker files for PostgreSQL and RabbitMQ (`./docker`)

The Profile API service can be run as a standalone service and [default values](profile/server/config.go) will be used for its configuration.
Configuration of the Profile API service can be done using [environment variables](profile/server/config.go), and the following environment variables are supported:
- `SERVER_PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `MQ_HOST`
- `MQ_PORT`
- `MQ_USER`
- `MQ_PASSWORD`

The Profile API Service assumes the PostgreSQL DB and RabbitMQ to be available, otherwise the API server will exit.

### Start the service

To start the Profile API service from source:
- Navigate to the `./profile` directory
- Run `go run main.go`

To start the Profile API service as a Docker process
- Navigate to the `./profile` directory
- Run `make build`
- Run `make run` (assuming the server is running on port `8080`)

### Start the Profile UI

To start the Profile API service from source:
- Navigate to the `./profile-ui` directory
- Run `npm start` (assuming the Profile API service is running on `loccalhost:8080`)


## Implementation of the requirements

### Web API

- The List, Create, and Update HTTP endpoints are implemented using `gorilla/mux`
- Create and Update request payload validation is implemented using `go-playground/validator`

### Web UI

- The Profile UI is implemented using `React`
- Local state management is done using `redux-thunk`
- Profile API is access via `axios`

### DB

- PostgreSQL database schema is available in `./profile/database/profile.create.sql`

### Events


### Containers

- Docker file for the Profile API service is given in `./profile/Dockerfile`

---

### Time

By looking at the challenge specification, my first impression is that completing everything listed will definitely take more than 6 hours for me as I need to set everything up from scratch on my local development environment and I need to have a look at how RabbitMQ works as this will be my first time using it. 

Most of the time will be spent on setting things up rather than coding the solution. 

The actual amount of time taken is around 8 hours.

### Assumptions

- No authentication is need for this challenge
  - Normally authentication and authorization for microservices are done at the API Gateway level and within the microservices system, communications are assumed to be secure and the authorized user information is assumed to be available within some kind of "context".

- No API Gateway is needed between the web user inferface and the service API
  - Ideally, an API Gateway is used between the user interfaces (web/mobile) and the actual service endpoints as another layer of abstraction
    - Authentication/authorization
    - Routing
    - Load balancing
    - Canary deployment

- No service-to-service API is needed
  - If the profile service is required to support direct communication with other services, a gRPC API can be implemented

- Only simple error-handling is required
  - There is no need to oordinate the error handling with user interfaces
    - I.e., design error code and use error code to convey the semantics of errors from server to the clients

## Going further

This initial implementation touched all elements required in the requirements doc, however, all those functions are implemented in the simplest form. Should there be any further implementation, the focus will be on the robustness of the Profile API service and the Profile UI.

- HTTP API error modeling
  - Currently, error messages are sent to the UI as `application/text` which is hard for the UI to parse and render.
  - Proper error code and error message should be defined and modeled as JSON object for the communication.

- HTTP API retry logic
  - Currently, on the Profile UI, one user action trigger ones API request, depending on the actual requirement, certain retry logic can be implemented to provide better user experience.

- Service connection retry logic
  - Currently, the connection from the Profile API server to the PostgreSQL DB and RabbitMQ is a one-time connection. If the single connection failed, the Profile API server will exit immediately without reestablishing the connections.
  - The reconnection logic should be implemented for robust server logic

- And more...