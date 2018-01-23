var readline = require('readline-sync')
const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

let usert = false
let pass = false

console.log('-> Creation de la DB <-')
while (usert === false) {
  var username = readline.question('Mail: ')
  if (username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    usert = true
  }
}

while (pass === false) {
  var password = readline.question('Password: ')
  let tab = password.trim().split(' ')
  if (tab.length === 1) pass = true
}

var hash = bcrypt.hashSync(password, 10)
let id = uuid()
let user = {
  _id: id,
  lock: true,
  block: false,
  superUser: true,
  prenom: '',
  nom: '',
  birthday: '',
  mail: username,
  passwd: hash,
  path: '',
  firstConnexion: false,
  lastConnexion: '',
  tokens: [],
  project: []
}

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/picture_ai', (err, db) => {
  if (err) { return console.dir(err) }
  db.createCollection('Users', () => {
    console.log(`Create Table Users`)
  })
  db.collection('Users').insert(user, null, (err, result) => {
    if (err) {
      console.dir(err)
      process.exit()
    } else {
      console.log('User Insert')
    }
  })
  db.close()
})
