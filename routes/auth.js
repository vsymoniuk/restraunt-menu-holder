const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login', controller.login)

router.post('/register', controller.register)

// router.get('/get', controller.get)

module.exports = router