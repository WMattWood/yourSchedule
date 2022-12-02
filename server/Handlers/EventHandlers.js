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

const insertEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    const formData = req.body.data

    // format data to add
    const newEvent = {  ...formData, _id: uuidv4() } 

    // insert formatted order to db Orders collection
    await db.collection("Events").insertOne( newEvent )

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
    const db = client.db(DATABASE_NAME)

    const allEvents = await db.collection("Events").find().toArray()

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: allEvents
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

const getAllEventsByMonth = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    const month = parseInt(req.params.month)
    const year = parseInt(req.params.year)
    const arrayOfEvents = await db.collection("Events").find( { dateMonth: month, dateYear: year} ).toArray()

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: arrayOfEvents
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

const getEventById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    const eventId = req.params.eventId
    const specificEvent = await db.collection("Events").findOne( { _id: eventId })

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: specificEvent
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
    const db = client.db(DATABASE_NAME)

    const eventId = req.params.eventId
    const formData = req.body.data

    let callListTest = formData.callList
    if (callListTest.every( el => el.name !== "unfilled" )) {
      formData.callListFull = true
    } else {
      formData.callListFull = false
    }

    await db.collection("Events").updateOne( { _id: eventId }, { $set: {...formData} })

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: formData
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

const updateCallListByEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect Client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    const eventId = req.params.eventId
    const idx = req.body.index
    const updatedEntry = req.body.updatedEntry

    let specifiedEvent = await db.collection("Events").findOne( { _id: eventId } )
    let mostUpToDateList = specifiedEvent.callList
      
    mostUpToDateList[idx] = updatedEntry

    await db.collection("Events").updateOne( { _id: eventId }, { $set: { callList: mostUpToDateList }})

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: updatedEntry
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
}

module.exports = { insertEvent, getAllEvents, getAllEventsByMonth, getEventById, updateEvent, updateCallListByEvent  }