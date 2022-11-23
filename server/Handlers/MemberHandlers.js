"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// CLIENT CONFIGURATION
const { MongoClient} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

const DATABASE_NAME = "yourSchedule"

const getAllMembers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    // do stuff

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: newEvent
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "ERROR"
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const getMember = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    // do stuff

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: newEvent
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "ERROR"
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};