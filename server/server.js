const express = require('express')
const helmet = require('helmet')
const morgan = require("morgan");
const port = 8000


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