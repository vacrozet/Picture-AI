const db = require('../../db.js')
const uuid = require('uuid')

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.mail !== '' && req.body.name !== '') {
    let id = uuid()
    let project = {
      _id: id,
      auteur: req.body.name,
      time: Math.round(Date.now() / 100),
      name: req.body.name,
      projet: []
    }
    db.get().then((db) => {
      db.collection('Users').insert(project, null, (err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        if (result) {
          db.collection('User').find({mail: req.user.mail}).toArray((err, result) => {
            if (err) return erreur(res, 500, false, 'Internal Server Error')
            let project = {
              _id: id,
              auteur: req.body.name,
              time: Math.round(Date.now() / 100),
              name: req.body.name
            }
            result[0].project.push(project)
            res.status(200)
            res.json({
              success: true
            })
          })
        }
      })
    })
  }
}
