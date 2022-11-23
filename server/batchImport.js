const membersArray = require("./data/members.json")

////// CLIENT CONFIGURATION //////
const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

////// BATCH IMPORT FUNCTION //////
const batchImport = async(collectionName, dataArray) => {
  const client = new MongoClient(MONGO_URI, options)
  await client.connect()
  console.log("Client connected.")
  const db = client.db("yourSchedule")  
  await db.collection(collectionName).insertMany(dataArray)
  client.close()
  console.log("Client disconnected.")
}

batchImport("Members", membersArray)