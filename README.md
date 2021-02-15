# Containers logger service
This proggram is a containers logger service. 
The program listen to already running containers, and new containers,
store their logs into storage and enable user to retrieve the logs.

## Configuration

## Runing
to run the proggram use one of the following command:
```
node . 
node server.js 
npm start
```

## Usage
After running the server, it will connect to active containers and store their logs.

optional GET request:
```
http://localhost:8000/containers            // retrieves all containers stored in the DB
http://localhost:8000/logger/:id/         // retrieves all logs for container container ID :id
http://localhost:8000/logger/:id/:type    // retrieves all logs for container container :id and type :type. optional types are: output / error
```
## From this project I have learned
create server with node.js/Express,
working with mongoDB,
working with Postman,
dockers, images and containers,
dockerize a node.js program,
using dockerode package for docker

## Time invested
I have worked on that project for about 3 days

## Improvements I would have done if I had more time or knowledge:
better logic to determine which containers' logs to store ,
caching the logs of the most used or most recently used containers to reduce the use of DB,
client-side with simple UI
