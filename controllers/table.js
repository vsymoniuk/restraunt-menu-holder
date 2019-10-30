const Table = require('../models/Table')
const User = require('../models/User')

module.exports.getAll = async function(req, res) {
    try {
        const tables = await Table.find()
        res.status(200).json(tables)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.create = async function(req, res) {
    try {


        const table = new Table({
            places: req.body.places,
            waiter: req.user.id,
            customer: req.user.id
        })

        await table.save()
        res.status(201).json(table)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.getById = function(req, res) {
}

module.exports.delete = function(req, res) {
}

module.exports.update = function(req, res) {
}
