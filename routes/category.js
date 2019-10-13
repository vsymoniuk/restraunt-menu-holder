const express = require('express')
const controller = require('../controllers/category')
const router = express.Router()

const upload = require('../upload')

router.get('/', controller.getAll)
router.post('/', controller.create)
router.get('/:id', controller.getById)
router.delete('/:id', upload.single('image'), controller.delete)
router.patch('/:id', upload.single('image'), controller.update)

module.exports = router