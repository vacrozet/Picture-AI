const db = require('../../db.js')

module.exports = (req, res) => {
  if (req.user.superUser) {
    db.get().then((db) => {
      db.collection('Users').remove({mail: req.query.mail})
      res.status(200)
      res.json({
        success: true,
        message: 'Utilisateurs Supprimé'
      })
    })
  }
}
