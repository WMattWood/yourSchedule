const express = require('express')
const helmet = require('helmet')
const morgan = require("morgan");
const port = 8000

const { getAllEvents, getEvent, insertEvent, updateEvent} = require('./Handlers/EventHandlers')
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

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  ////////// EVENT ENDPOINTS
  // get all events from database 
  .get('/calendar/allevents', getAllEvents)

  // get specific event from db
  .get('/calendar/:eventId', getEvent)

  // insert new event into db
  .post('/calendar/insert', insertEvent)

  // update a specific event from db
  .patch('/calendar/:eventId', updateEvent)


  ////////// MEMBER ENDPOINTS
  // get all members from db
  .get('/members/allmembers', getAllMembers)

  // get specific member from db
  .get('/members/:memberId', getMember)

  //// insert a new member into the db
  // .post('/members/insert')
