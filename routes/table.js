const express = require('express')
const controller = require('../controllers/table')
const router = express.Router()
const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session: false}) , controller.getAll)
router.post('/',passport.authenticate('jwt', {session: false}) , controller.create)
router.get('/:id',passport.authenticate('jwt', {session: false}) , controller.getById)
router.delete('/:id',passport.authenticate('jwt', {session: false}) , controller.delete)
router.patch('/:id',passport.authenticate('jwt', {session: false}) , controller.update)

module.exports = router