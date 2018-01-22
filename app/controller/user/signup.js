const db = require('../../db.js')

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log(req.body)
  if (req.user.superUser === true) {
    if (req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      db.get().then((db) => {
      })
    } else return erreur(res, 404, false, 'Wrong authorization')
  } else return erreur(res, 404, false, 'Wrong authorization')
}
