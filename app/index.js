const express = require('express')
const hostname = 'localhost'
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const db = require('./db.js')
const port = 3005

global.app = app

db.connect()

// require('./socket.js')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/', require('./routes/index.js'))

app.use((req, res) => {
  res.status(404)
  res.json({
    message: 'URL not Found API'
  })
})

app.listen(port, hostname, () => {
  console.log('Mon serveur fonctionne sur http://' + hostname + ':' + port)
})

process.on('SIGINT', () => {
  db.close()
  process.exit()
})
