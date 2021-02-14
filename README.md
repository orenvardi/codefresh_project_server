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
http://localhost:8000/containers            // retrieves all containers name stored in the DB
http://localhost:8000/logger/:name/         // retrieves all logs for container name :name
http://localhost:8000/logger/:name/:type    // retrieves all logs for container name :name and type :type. optional types are: output / error
```
## What you learned from it
From this project I have learned to 
create server with node.js/Express
working with mongoDB
working with Postman
dockers, images and containers
dockerize a node.js program
using dockerode package for docker

## Time invested
I have worked on that project for about 3 days

## Improvements I would have done if I had more time or knowledge:
better logic to determine which containers' logs to store 
caching the logs of the most used containers to reduce the use of DB
client-side with simple UI