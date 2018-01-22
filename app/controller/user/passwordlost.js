const db = require('../../db.js')
const bcrypt = require('bcryptjs')

function error (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.newPass === undefined && req.body.newPass !== req.body.newPass1) return error(res, 403, false, 'Query not Found')
  db.get().then((db) => {
    db.collection('Users').find({mail: req.user.mail}).toArray((err, result) => {
      if (err) return error(res, 500, false, 'Internal Server Error')
      if (result.length === 1) {
        if (!bcrypt.compareSync(req.body.oldPass, result[0].passwd)) return error(res, 403, false, 'Wrong Passwd')
        db.collection('Users').update({mail: req.user.mail}, {
          $set: {
            passwd: bcrypt.hashSync(req.body.newPass, 10),
            lock: false
          }
        }).then((res1) => {
          res.json({
            success: true,
            message: 'Password Changed'
          })
        }).catch((err1) => {
          console.log(err1)
        })
      }
    })
  })
}
