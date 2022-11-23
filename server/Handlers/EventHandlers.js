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
  
const database = "yourSchedule"

const addNewEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(database)

    // format data to add
    const newEvent = {  _id: uuidv4(),
                        firstName: "",
                        lastName: "",
                        email: "",
                        address: "",
                      } 

    // insert formatted order to db Orders collection
    await db.collection("Orders").insertOne( newEvent )

    res.status(200).json({
      status: 200,
      message: "New Event Created",
      data: newEvent
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "Event not created"
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

const getAllEvents = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(database)

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

const getEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(database)

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

const updateEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(database)

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

module.exports = { addNewEvent, getAllEvents, getEvent, updateEvent }