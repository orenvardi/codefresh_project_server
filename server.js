const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const dbUrl = require("./config/db.js");

const serverRequests = require("./app/routes/server_requests");
const userRequests = require("./app/routes");

const app = express();
const port = 8000;
app.listen(port);
app.use(bodyParser.urlencoded({ extended: true }));

var Docker = require("dockerode");
var stream = require("stream");
var docker = new Docker({ socketPath: "/var/run/docker.sock" });

var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function containerLogs(client, containerInfo) {
  let container = docker.getContainer(containerInfo.containerId);

  var logStreamOut = new stream.PassThrough();
  var logStreamErr = new stream.PassThrough();

  logStreamOut.on("data", function (chunk) {
    serverRequests.postContainerToDB(client, containerInfo, chunk, "output");
  });

  logStreamErr.on("data", function (chunk) {
    serverRequests.postContainerToDB(client, containerInfo, chunk, "error");
  });

  container.logs(
    { follow: true, stdout: true, stderr: true },
    function (err, stream) {
      if (err) {
        console.log(err);
      }
      container.modem.demuxStream(stream, logStreamOut, logStreamErr);

      stream.on("end", function () {
        logStreamOut.end("!stop!");
      });
    }
  );
}

MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }

    const database = client.db("logger");

    docker.listContainers(function (err, containers) {
      if (err) {
        console.log(err);
      } else {
        containers.forEach(function (containerInfo) {
          let info = {
            containerId: containerInfo.Id,
            containerName: containerInfo.Names[0].substring(1),
            containerImage: containerInfo.Image,
          };
          serverRequests.insertContainerToDB(database, info);
          containerLogs(client, info);
        });
      }
    });

    docker.getEvents(
      { event: "start", type: "container" },
      function (err, data) {
        if (err) {
          console.log(err.message);
        } else {
          data.on("data", function (chunk) {
            let details = JSON.parse(chunk.toString("utf8"));
            if (details.status == "start") {
              let info = {
                containerId: details.id,
                containerName: details.Actor.Attributes.name,
                containerImage: details.Actor.Attributes.image,
              };
              
              serverRequests.insertContainerToDB(database, info);
              containerLogs(client, info);
            }
          });
        }
      }
    );

    // listener for requests from client on port 8000
    userRequests(app, database);

    //closing db connection and terminate proggram
    rl.on("line", function (line) {
      if (line == "close") {
        console.log("closing DB and terminating");
        client.close();
        process.exit(0);
      }
    });
  }
);
