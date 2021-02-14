module.exports = function insertContainerToDB(database, info) {
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
