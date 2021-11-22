const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_DB = process.env.MONGODB_DB;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

if (!MONGODB_DB) {
  throw new Error("Please define MONGODB_DB");
}
if (!MONGO_CLUSTER) {
  throw new Error("Please define MONGO_CLUSTER");
}
if (!MONGO_USER) {
  throw new Error("Please define MONGO_USER");
}
if (!MONGO_PASSWORD) {
  throw new Error("Please define MONGO_PASSWORD");
}


mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`,
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error: "));
conn.once("open", function () {
  console.log("Connected Mongo DB successfully");
});

module.exports = conn