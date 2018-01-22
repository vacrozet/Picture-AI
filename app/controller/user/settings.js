const db = require('../../db.js')

function erreur (res, status, bool, message, div) {
  res.status(status)
  res.json({
    success: bool,
    message: message,
    div: div
  })
}

module.exports = (req, res) => {
  let prenom = false
  let nom = false
  let birthday = false
  let mail = false
  console.log('req.user ==>')
  console.log(req.user)
  console.log('req.body ==>')
  console.log(req.body)
  if (req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    mail = true
  }
  if (req.body.birthday === '' || req.body.birthday.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)) {
    birthday = true
  }
  if (req.body.prenom.trim() === '' || req.body.prenom.trim().match(/^[a-zA-Zàâéèëêïîôùüç -]{1,20}$/)) {
    prenom = true
  }
  if (req.body.nom.trim() === '' || req.body.nom.trim().match(/^[a-zA-Zàâéèëêïîôùüç -]{1,20}$/)) {
    nom = true
  }
  if (prenom && nom && birthday && mail) {
    db.get().then((db) => {
      db.collection('Users').find({}).toArray((err, result) => {
        if (err) return erreur(res, 500, false, 'Internal Server Error')
        if (result.length !== 0) {
          result.forEach(element => {
            if (element.mail === req.user.mail) {
              element.prenom = req.body.prenom
              element.nom = req.body.nom
              element.birthday = req.body.birthday
              element.mail = req.body.mail
            }
          })
          db.collection('Users').update({mail: req.user.mail}, {
            $set: {
              prenom: req.body.prenom,
              nom: req.body.nom,
              birthday: req.body.birthday,
              mail: req.body.mail
            }})
          res.status(200)
          res.json({
            success: true,
            message: 'Donnée modifié'
          })
        }
      })
    })
  } else {
    let div
    if (!prenom) div = 'prenom'
    if (!nom) div = 'nom'
    if (!birthday) div = 'birthday'
    if (!mail) div = 'mail'
    return erreur(res, 404, false, 'Paramètre invalid', div)
  }
}
