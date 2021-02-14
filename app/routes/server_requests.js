exports.insertContainerToDB = function (database, info) {
  database.collection("containers").updateOne(
      { containerId: info.containerId },
      { $set: { ...info, timestamp: new Date().toLocaleString()}},
      { upsert: true },
      (err, item) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        }
      }
    );
}

exports.postContainerToDB = function (client, containerInfo, chunk, type) {
  const database = client.db("logger");
  const log = {
    containerId: containerInfo.containerId,
    containerName: containerInfo.containerName,
    containerImage: containerInfo.containerImage,
    type: type,
    log: chunk.toString("utf8").slice(0, -1),
    time: new Date().toLocaleString(),
  };
  database.collection("logger").insertOne(log, (err, result) => {
    if (err) {
      console.log({ error: "An error has occurred " + err });
    }
  });
}