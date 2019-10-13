const Position = require('../models/Position')
const User = require('../models/User')

module.exports.getByCategoryId = async function(req, res) {
    try {

        const positions = await Position.find({
            category: req.params.categoryId
        })
        res.status(200).json(positions)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.create = async function(req, res) {
    try {

        const user = await User.findOne({email: "empty"})

        const position = new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: user.id
        })

        await position.save()
        res.status(201).json(position)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.delete = function(req, res) {
}

module.exports.update = function(req, res) {
}
