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
      let superUser
      db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
        if (err) return erreur(res, 404, false, 'Internal Server Error')
        if (result.length === 1) {
          if (result[0].superUser === true) superUser = false
          else superUser = true
          db.collection('Users').update({mail: req.body.mail}, {
            $set: {
              superUser: superUser
            }
          })
          res.status(200)
          res.json({
            success: true,
            message: 'superUser Changed',
            superUser: superUser
          })
        } else return erreur(res, 404, false, 'Wrong Multi User')
      })
    })
  } else return erreur(res, 404, false, 'Wrong authorization')
}
