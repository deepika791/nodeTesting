const express = require('express')
const app = express()
const port = 3000

app.get('/inner', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => res.send("Got post Request"))
app.use(express.static('public'))
app.put('/user', (req, res) => res.send('Got a PUT request at /user'))
app.delete('/user', (req, res) => res.send("Deeleting user"))

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
    console.log("after next")
  })

  app.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })

  app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id)
    next()
    
  }, function (req, res, next) {
    res.send('User Info')
  })

  app.get('/user/:id', function (req, res, next) {
    console.log('IDs:', req.params.id)
    res.end(req.params.id)
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))