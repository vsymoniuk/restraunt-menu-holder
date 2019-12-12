const Position = require('../models/Position')
const User = require('../models/User')
const keys = require('../config')
const bot = require('../bot')

module.exports.getByCategoryId = async function (req, res) {
    try {


        const limit = +keys.pageLimit
        const page = +req.query.page || 1

        const positions = await Position.find({
                category: req.params.categoryId,
                name: {
                    $regex: `.*(?i)${req.query.filter || ''}(?-i).*`
                }
            }).skip(limit * page - limit)
            .limit(limit)

        res.status(200).json(positions)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.create = async function (req, res) {
    try {

        const position = new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
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

module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        cost: req.body.cost
    }

    try {


        // Position.findOne({
        //     _id: req.params.id
        //     })
        //     .then(position => {
        //         User.find({})
        //             .then(users => {
        //                 for (let i = 0; i < users.length; i++) {
        //                     let u = users[i]
        //                     for (let j = 0; j < u.categorySubscribes.length; j++) {
        //                         if (`${u.categorySubscribes[j]}` === `${position.category}` && req.body.cost < position.cost )
        //                             sendHTML(u.chatId, `<b>SALES -${((position.cost - req.body.cost)/position.cost * 100).toFixed(2)}% </b>\nВстигніть скуштувати ${position.name} по заниженій ціні!`)
        //                     }
        //                 }
        //             })
        //     })

        Position.findOne({
            _id: req.params.id
        }).then(position => {
             User.find({categorySubscribes: `${position.category}`})
            .then(subscribedUsers => {
                for(let i = 0;i < subscribedUsers.length;i++){
                    if(req.body.cost < position.cost && subscribedUsers[i].chatId) 
                    sendHTML(subscribedUsers[i].chatId, `<b>SALES -${((position.cost - req.body.cost)/position.cost * 100).toFixed(2)}% </b>\nВстигніть скуштувати ${position.name} по заниженій ціні!`)
                }
            })
        })


        const position = await Position.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: updated
        }, {
            new: true
        })

        res.status(200).json(position)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

module.exports.delete = async function (req, res) {
    try {

        await Position.remove({
            _id: req.params.id
        })
        res.status(200).json({
            message: 'Position was deleted'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
        })
    }
}

function sendHTML(chatId, html) {
    const options = {
        parse_mode: 'HTML'
    }

    // console.log(bot);
    bot.sendMessage(chatId, html, options)
    
}