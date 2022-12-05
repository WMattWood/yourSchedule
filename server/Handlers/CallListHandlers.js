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

const updateCallListByEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect Client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    // pull the data from the request
    const eventId = req.params.eventId
    const idx = req.body.index
    const updatedEntry = req.body.updatedEntry

    // find specified event and update the appropriate index with the new entry
    let specifiedEvent = await db.collection("Events").findOne( { _id: eventId } )
    specifiedEvent.callList[idx] = updatedEntry
    
    // write the new updated callList to the appropriate Event document in the db
    let updatedCallList = specifiedEvent.callList
    await db.collection("Events").updateOne( { _id: eventId }, { $set: { callList: updatedCallList }})

    // success response
    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: specifiedEvent
    })

  } catch(err) {
    // error response
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

const removePosition = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect Client
    await client.connect()
    console.log("Connected")
    const db = client.db(DATABASE_NAME)

    // pull the data from the request
    const eventId = req.params.eventId
    const idx = req.body.index

    // grab the old collection and replace the old callList with a new one
    let updatedEvent = await db.collection("Events").findOne( { _id: eventId } )
    updatedEvent.callList = updatedEvent.callList.filter( (el, index) => index !== idx )

    // update the document with the updated event
    await db.collection("Events").updateOne( { _id: eventId }, { updatedEvent } )

    // success response
    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: updatedEvent
    })

  } catch(err) {
    // error response
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

const addPosition = async (req, res) => {
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
    // let mostUpToDateList = specifiedEvent.callList
      
    specifiedEvent.callList[idx] = updatedEntry

    await db.collection("Events").updateOne( { _id: eventId }, { $set: { callList: specifiedEvent.callList }})

    res.status(200).json({
      status: 200,
      message: "SUCCESS",
      data: specifiedEvent
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

module.exports = {  updateCallListByEvent, 
                    removePosition, 
                    addPosition  
                  }