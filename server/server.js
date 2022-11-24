const express = require('express')
const helmet = require('helmet')
const morgan = require("morgan");
const port = 8000

const { insertEvent, getAllEvents, getAllEventsByMonth, getEventById, updateEvent} = require('./Handlers/EventHandlers')
const { getAllMembers, getMember } = require('./Handlers/MemberHandlers')

express()
 
  // middleware
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  // initial test endpoint
  .get('/howdy', (req, res) => {
    // res.send('Hello World!')
    res.status(200).json({status: 200, message: "Hello World!" })
  })


  ////////// EVENT ENDPOINTS
  // insert new event into db
  .post('/calendar/insert', insertEvent)

  // get all events from database 
  .get('/calendar/allevents', getAllEvents)

  // get all events for a given month
  .get(`/calendar/month`, getAllEventsByMonth)

  // get specific event from db
  .get('/calendar/:eventId', getEventById)

  // update a specific event from db
  .patch('/calendar/:eventId', updateEvent)


  ////////// MEMBER ENDPOINTS
  // get all members from db
  .get('/members/allmembers', getAllMembers)

  // get specific member from db
  .get('/members/:memberId', getMember)

  //// insert a new member into the db
  // .post('/members/insert')

  // Node spins up server and sets it to listen on specified port
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  