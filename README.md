# Profile Service 

A demo application for React and Microservices

The detailed requirements are given in: [doc/requirement_original.md](doc/requirement_original.md)

## Components

### Service

- Create new profiles
- Update existing profiles
- List existing profiles

- Profile data validation

### Web API

- Allow HTTP access from client applications
  - Create
  - Update
  - List

### Web UI

- A simple user interface to manage the profiles in React function components wtih hooks
  - Create
  - Update
  - List

### Service API

### DB

- Postgres

- Schema: profile-service
- Table: profile
- Fields:
  - Name
  - Gender
  - DoB
  - Postcode
  - Phone number
- Constraints

### Events

- Event design

- Communicate with other services when a profile is created or updated
- RabbitMQ

### Containers

- A Docker file for the service that expose the web API endpoints
- Run a container with the web API, the database and the message broker in it

### Codebase/Versioning/Documentation

- Github
- README
  - Instructions
  - Thoughts


---

### Time

By looking at the challenge specification, my first impression is that completing everything listed will definitely take more than 6 hours for me as I have to set everything up from scratch on my local development environment and I need to have a look at how RabbitMQ works as this will be my first time using it. 

Most of the time will be spent on setting things up rather than coding the solution. 

### Tasks not listed but needed

- Library selection
  - Database connection library
  - Logging library

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

- Only basic logging is required
  - For production logging, `uber/zap` might be a better option


## How to run it

- Start the infrastructure

- Start the service

- Start the web user interface

## Possible Improvements

