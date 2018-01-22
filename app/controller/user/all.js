const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.superUser === true) {
    db.get().then((db) => {
      db.collection('Users').find({mail: {$ne: req.user.mail}}).toArray((err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        result.forEach(element => {
          delete element._id
          delete element.passwd
          delete element.path
          delete element.tokens
          delete element.project
        })
        res.json({
          success: true,
          result: result
        })
      })
    })
  } else return erreur(res, 404, false, 'Wrong authorization')
}
