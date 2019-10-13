const Category = require('../models/Category')
const User = require('../models/User')

module.exports.getAll = async function (req, res) {
    try {
        //@todo make to show admin`s categories
        const categories = await Category.find()
        res.status(200).json(categories)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.create = async function (req, res) {
    try {
        const user = await User.findOne({email: "empty"})
        
        const category = new Category({
            name: req.body.name,
            //@todo make to show admin`s
            user: user.id,
            imageSrc: req.file ? req.file.path : ''
        })

        await category.save()
        res.status(201).json(category)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.getById = function (req, res) {}

module.exports.delete = function (req, res) {}

module.exports.update = function (req, res) {}