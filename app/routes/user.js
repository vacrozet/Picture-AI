const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.get('/info', middle('USER'), require('../controller/user/info.js'))
router.put('/info', middle('USER'), require('../controller/user/settings.js'))
router.get('/all', middle('USER'), require('../controller/user/all.js'))
router.put('/superUser', middle('USER'), require('../controller/user/superUser.js'))
router.put('/resetPassAdmin', middle('USER'), require('../controller/user/resetPassAdmin.js'))
router.use('/signup', middle('USER'), require('../controller/user/signup.js'))
router.put('/resetpassword', require('../controller/user/resetPass.js'))
router.put('/passwordlost', middle('USER'), require('../controller/user/passwordlost.js'))

module.exports = router
