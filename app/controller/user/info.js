function erreur (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.mail !== undefined) {
    res.status(200)
    res.json({
      success: true,
      user: req.user
    })
  } else return erreur(res, 404, false, 'User Not found')
}
