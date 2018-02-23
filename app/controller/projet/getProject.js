const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.mail !== '') {
    db.get().then((db) => {
      db.collection('Projects').fing({}).toArray((err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        if (result) {
          res.status(200)
          res.json({
            success: true,
            result: result
          })
        }
      })
    })
  }
}
