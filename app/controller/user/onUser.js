const db = require('../../db.js')
const moment = require('moment')

function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}
function getMomentJs (time) {
  return (
    moment.locale('fr'),
    moment.unix(time / 10).format('lll')
  )
}

module.exports = (req, res) => {
  if (req.user.superUser === true) {
    db.get().then((db) => {
      db.collection('Users').find({mail: req.query.mail}).toArray((err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        if (result.length === 1) {
          result.forEach(element => {
            delete element._id
            delete element.passwd
            delete element.path
            delete element.tokens
            delete element.project
            element.lastConnexion = getMomentJs(element.lastConnexion)
          })
          res.status(200)
          res.json({
            success: true,
            result: result[0],
            superUser: req.user.superUser
          })
        } else return erreur(res, 404, false, 'Mutli or Not User')
      })
    })
  } else return erreur(res, 404, false, 'Wrong authorization')
}
