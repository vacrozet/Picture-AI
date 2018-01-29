const db = require('../../db.js')
var sendmail = require('sendmail')({
  devPort: false, // Default: False
  devHost: 'localhost' // Default: localhost
})
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
  if (req.user.superUser === true) {
    if (req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      db.get().then((db) => {
        db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
          if (err) return erreur(res, 500, false, 'Internal Server Erreur')
          if (result.length === 0) {
            const pass = generator.generate({length: 5, numbers: true})
            console.log('envoi du mail -->')
            sendmail({
              port: 587,
              secure: true,
              from: 'soyuz.digital@soyuz.digital',
              to: req.body.mail,
              replyTo: 'valentin@soyuz.digital.com',
              subject: 'Bienvenue sur Picture AI @ Soyuz Digital',
              html:
              `<html>
              <head>
                  <meta http-equiv='content-type' content='text/html; charset=utf-8'>
                  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'>
              </head>
              <body leftmargin='0px' topmargin='0px' marginwidth='0px' marginheight='0px'>
                <table bgcolor='#262931' valign='top' height='100%' width='100%' cellpadding='0' cellspacing='0' border='0'>
                  <tbody>
                  <tr>
                    <td>
                      <div>
                          <table bgcolor='#262931' align='center' height='100%' width='100%' cellpadding='0' cellspacing='0' border='0'>
                            <tbody>
                              <tr><td height='60px'></td></tr>
                              <tr><td align='center'><a href='http://localhost:3000/'><img class='name' src='https://soyuz.digital/wp-content/themes/soyouz2016/images/logo-soyuz.png' alt='SoyuzDigital'></a></td></tr>
                              <tr height='30px;'><td></td></tr>
                              <tr>
                                <td align='center' style='font-size: 22px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Bienvenue sur Picture AI</td>
                              </tr>
                              <tr height='20px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'> Un compte a été créé pour vous</td></tr>
                              <tr height='20px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Identifiant:</td></tr>
                              <tr height='5px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${req.body.mail}</td></tr>
                              <tr height='10px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Password:</td></tr>
                              <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${pass}</td></tr>
                              <tr height='30px;'><td></td></tr>
                              <tr><td align='center' style='text-decoration: none; font-size: 20px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif; border-spacing: 10px;'><a href='http://localhost:3000/' style='text-decoration: none; color: #ffcc00; font-size: 30px;'>Picture AI</a></td></tr>
                              <tr height='60px;'><td></td></tr>
                            </tbody>
                          </table>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </body>
              </html>`
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
