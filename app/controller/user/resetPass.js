const db = require('../../db.js')
// const nodemailer = require('nodemailer')
var sendmail = require('sendmail')({silent: true})
const generator = require('generate-password')
const bcrypt = require('bcryptjs')

function error (res, status, bool, message, div) {
  res.status(status)
  res.json({
    success: bool,
    message: message,
    div: div
  })
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
      if (err) return error(res, 400, false, 'Internal Server Error')
      if (result.length === 1) {
        const pass = generator.generate({length: 5, numbers: true})
        console.log('envoi du mail -->')
        sendmail({
          from: 'soyuz.digital@soyuz.digital',
          to: 'valentin@soyuz.digital',
          replyTo: 'valentin@soyuz.digital.com',
          subject: 'Nouveau mot de passe Picture_AI',
          html: `Bonjour, ${result[0].prenom}<br />
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
        // nodemailer.createTestAccount((err, account) => {
        //   if (err) return error(res, 500, 'mail not send')
        //   let transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true, // true for 465, false for other ports
        //     auth: {
        //       user: 'admmatcha@gmail.com', // generated ethereal user
        //       pass: 'Apwn789123'  // generated ethereal password
        //     }
        //   })
        //   let url = `http://localhost:3000/reset/resetpasswd/${hash}`
        //   let mailOptions = {
        //     from: '"Matcha Admin" <admmatcha@gmail.com>', // sender address
        //     to: result[0].mail, // list of receivers
        //     subject: 'Reset Passwd', // Subject line
        //     text: ', // plain text body',
        //     html: `Hey,<b>Pour reset ton passwd clique <a href=${url}>ici</a></b>` // html body
        //   }
        //   transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) return error(res, 500, 'mail not send')
        //     return res.json({
        //       success: true,
        //       message: 'mail send'
        //     })
        //   })
        // })
      } else return error(res, 404, false, 'Mail not found', 'mail')
    })
  })
}
