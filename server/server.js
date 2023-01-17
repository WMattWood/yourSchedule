const express = require('express')
const helmet = require('helmet')
const morgan = require("morgan");
const port = 8000

const { insertEvent, getAllEvents, getAllEventsByMonth, getEventById, updateEvent} = require('./Handlers/EventHandlers')
const { updateCallListByEvent, removePosition, addPosition } = require('./Handlers/CallListHandlers')
const { getAllMembers, getMember } = require('./Handlers/MemberHandlers')
const { msgServerViaWebHook, httpPostViaWebHook } = require('./discord_server/commands/DiscordHandlers')

express()
 
  // middleware
  .use(express.json())
  .use(helmet())
  .use(morgan('tiny'))

  // CORS management
  .all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development')
      res.header({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Origin, X-RequestedWith, Content-Type, Accept',
      })
    if (process.env.NODE_ENV === 'production')
      res.header({
        'Access-Control-Allow-Origin': 'https://yourschedule.onrender.com',
        'Access-Control-Allow-Headers': 'Origin, X-RequestedWith, Content-Type, Accept',
      })
  })

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
  .get('/calendar/:year/:month', getAllEventsByMonth)

  // get specific event from db
  .get('/calendar/:eventId', getEventById)

  // update a specific event from db
  .patch('/calendar/:eventId', updateEvent)


  ////////// CALLLIST ENDPOINTS
  // update a specific callList entry
  .patch('/callList/:eventId', updateCallListByEvent)

  // delete a specific callList entry
  .patch('/callList/delete/:eventId', removePosition)

  // delete a specific callList entry
  .patch('/callList/add/:eventId', addPosition)


  ////////// MEMBER ENDPOINTS
  // get all members from db
  .get('/members/allmembers', getAllMembers)

  // get specific member from db
  .get('/members/:memberId', getMember)

  //// insert a new member into the db
  // .post('/members/insert')


  ////////// MESSAGE DISCORD
  // .post('/discord/:eventId', httpPostViaWebHook)
  .post('/discord/:eventId', msgServerViaWebHook)

  // Node spins up server and sets it to listen on specified port
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  