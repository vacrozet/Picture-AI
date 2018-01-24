const db = require('../../db.js')
var sendmail = require('sendmail')({silent: true})
const generator = require('generate-password')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

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
        db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
          if (err) return erreur(res, 500, false, 'Internal Server Erreur')
          if (result.length === 0) {
            const pass = generator.generate({length: 5, numbers: true})
            console.log('envoi du mail -->')
            sendmail({
              from: 'soyuz.digital@soyuz.digital',
              to: 'valentin@soyuz.digital',
              replyTo: 'valentin@soyuz.digital.com',
              subject: 'Nouveau mot de passe Picture_AI',
              html: `Bonjour,<br />
                    Votre Identifiant Soyuz Digital Pictue AI est ${req.body.mail} <br />
                    Votre mot de passe par default est '${pass}'`
            }, (err, reply) => {
              if (err) console.log(err)
              if (reply) {
                let id = uuid()
                let user = {
                  _id: id,
                  lock: true,
                  block: false,
                  superUser: false,
                  prenom: '',
                  nom: '',
                  birthday: '',
                  mail: req.body.mail,
                  passwd: bcrypt.hashSync(pass, 10),
                  path: '',
                  firstConnexion: false,
                  lastConnexion: '',
                  tokens: [],
                  project: []
                }
                db.collection('Users').insert(user, null, (err, result) => {
                  if (err) return erreur(res, 500, false, 'Erreur Injection Utilisateur')
                  res.status(200)
                  res.json({
                    success: true,
                    message: 'Utilisateur Ajouté'
                  })
                })
              }
            })
          } else return erreur(res, 404, false, 'User already present')
        })
      })
    } else return erreur(res, 404, false, 'Wrong authorization')
  } else return erreur(res, 404, false, 'Wrong authorization')
}
