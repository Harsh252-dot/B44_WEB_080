const mongoose = require("mongoose");

if (!process.env.ATLAS_URI) {
  throw new Error(
    "Please define the ATLAS_URI environment variable inside config.env"
  );
}

const conn = mongoose
  .connect(process.env.ATLAS_URI)
  .then((db) => {
    console.log("Database Connected Successfully");
    return db;
  })
  .catch((err) => {
    console.log("Connection Error: ", err);
    throw err;
  });

module.exports = conn;
