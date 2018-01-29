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
            html: ` <html>
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
                            <tr><td height='30px'></td></tr>
                            <tr><td align='center'><a href='http://localhost:3000/'><img class='name' src='https://soyuz.digital/wp-content/themes/soyouz2016/images/logo-soyuz.png' alt='SoyuzDigital'></a></td></tr>
                            <tr height='30px;'><td></td></tr>
                            <tr>
                              <td align='center' style='font-size: 22px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Bonjour ${result[0].prenom}, </td>
                            </tr>
                            <tr height='30px;'><td></td></tr>
                            <tr>
                              <td align='center' style='font-size: 22px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Un administrateur à réinitialisé ton mot de passe</td>
                            </tr>
                            <tr height='20px;'><td></td></tr>
                            <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'> Savais-tu que tu pouvais le faire toi même ? ;)</td></tr>
                            <tr height='20px;'><td></td></tr>
                            <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Ton nouveau mot de passe :</td></tr>
                            <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${pass}</td></tr>
                            <tr height='30px;'><td></td></tr>
                            <tr><td align='center' style='text-decoration: none; font-size: 20px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif; border-spacing: 10px;'><a href='http://localhost:3000/' style='text-decoration: none; color: #ffcc00; font-size: 30px;'>Picture AI</a></td></tr>
                            <tr height='30px;'><td></td></tr>
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
