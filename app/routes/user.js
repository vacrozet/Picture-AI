const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.get('/info', middle('USER'), require('../controller/user/info.js'))
router.put('/info', middle('USER'), require('../controller/user/settings.js'))
// router.use('/signup', require('../controller/user/signup.js'))
router.put('/resetpassword', require('../controller/user/resetPass.js'))
router.put('/passwordlost', middle('USER'), require('../controller/user/passwordlost.js'))

module.exports = router
