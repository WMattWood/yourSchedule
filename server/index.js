const express = require('express')
const port = 8000


express()

  
  .get('/', (req, res) => {
    res.send('Hello World!')
  })

  .listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })