const db = require('../../db.js')
var sendmail = require('sendmail')({silent: true})
const generator = require('generate-password')
const bcrypt = require('bcryptjs')

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
          const pass = generator.generate({length: 5, numbers: true})
          console.log('envoi du mail -->')
          sendmail({
            from: 'soyuz.digital@soyuz.digital',
            to: 'valentin@soyuz.digital',
            replyTo: 'valentin@soyuz.digital.com',
            subject: 'Nouveau mot de passe Picture_AI',
            html: `Bonjour ${result[0].prenom},<br />
                  Votre mot de passe par default est '${pass}'`
          }, (err, reply) => {
            if (err) console.log(err)
            if (reply) {
              db.collection('Users').update({mail: result[0].mail}, {
                $set: {
                  lock: true,
                  passwd: bcrypt.hashSync(pass, 10)
                }
              })
              res.json({
                success: true,
                message: 'Mail Correctement Envoyé'
              })
            }
          })
        } else return erreur(res, 404, false, 'Wrong Multi User')
      })
    })
  } else return erreur(res, 404, false, 'Wrong authorization')
}
