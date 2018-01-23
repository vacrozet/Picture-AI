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
      db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        if (result.length === 1) {
          let block
          if (result[0].block === true) block = false
          else block = true
          db.collection('Users').update({mail: req.body.mail}, {
            $set: {
              block: block
            }
          })
          db.close()
          res.status(200)
          res.json({
            success: true,
            message: 'Block Changed'
          })
        } else return erreur(res, 404, false, 'Wrong Any or Multi User')
      })
    })
  } else return erreur(res, 404, false, 'Wrong authorization')
}
