const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()
const passport = require('passport')

router.post('/login', controller.login)

router.post('/register', controller.register)

router.get('/:role',passport.authenticate('jwt', {session: false}) , controller.getUsers)

router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete)

router.patch('/:id',passport.authenticate('jwt', {session: false}) , controller.update)

// router.get('/:',passport.authenticate('jwt', {session: false}) , controller.getInfo)

router.get('/v1',passport.authenticate('jwt', {session: false}) , controller.getEmpty)

module.exports = router