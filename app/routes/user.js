const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.get('/info', middle('USER'), require('../controller/user/info.js'))
router.put('/info', middle('USER'), require('../controller/user/settings.js'))
router.get('/all', middle('USER'), require('../controller/user/all.js'))
router.put('/block', middle('USER'), require('../controller/user/block.js'))
router.get('/onuser', middle('USER'), require('../controller/user/onUser.js'))
router.delete('/delete', middle('USER'), require('../controller/user/delete.js'))
router.put('/superuser', middle('USER'), require('../controller/user/superUser.js'))
router.put('/resetpassadmin', middle('USER'), require('../controller/user/resetPassAdmin.js'))
router.use('/signup', middle('USER'), require('../controller/user/signup.js'))
router.put('/resetpassword', require('../controller/user/resetPass.js'))
router.put('/passwordlost', middle('USER'), require('../controller/user/passwordlost.js'))

module.exports = router
