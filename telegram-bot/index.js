const config = require('../config')
const mongoLink = process.env["MONGO_URI"] || config.mongoURI
const mongoose = require('mongoose')

const Category = require('../models/Category')
const Position = require('../models/Position')
const User = require('../models/User')

mongoose.connect(mongoLink)
    .then(() => console.log('TelegramMongo connected.'))
    .catch(error => console.log(error))


const TelegramBot = require('node-telegram-bot-api')

module.exports =  bot = new TelegramBot('992331136:AAGdT-RrrJCegsvagEHd55I_GkAG0cOFHF0', {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})



bot.onText(/\/start/, msg => {
    const text = `Привіт, ${msg.from.first_name}\nСинхронізуйтесь з веб-додатком для отримання сповіщень`
    bot.sendMessage(msg.chat.id, text)
})

bot.onText(/\/synchronize/, msg => {

    User.findOne({telegramTag: `@${msg.from.username}`})
    .then(
        user => {
            if(user) {
                user.chatId = msg.chat.id
                User.findOneAndUpdate({_id: user._id}, {$set: user}, {new: true})
                .then(newUser => {
                    bot.sendMessage(msg.chat.id, `Синхронізація була проведена успішно!`)
                })
            } else {
                bot.sendMessage(msg.chat.id, `Користувача з таким юзернеймом не було знайдено на  сайті.\nЗареєструйтеся або змініть дані в налаштуваннях профілю`)
            }
        }
        
    ).catch(err => console.log(err))


    
    
    
    
})

bot.onText(/\/menu/, msg => {

    sendAllCategories(msg.chat.id)
})

bot.on("polling_error", (err) => console.log(err));


function sendHTML(chatId, html) {
    const options = {
        parse_mode: 'HTML'
    }

    bot.sendMessage(chatId, html, options)
}

function sendAllCategories(chatId) {
    Category.find({})
        .then(categories => {

            const html = categories.map((c, i) => {
                return `<b>${i+1}</b> ${c.name} /c${c._id}`
            }).join('\n')

            sendHTML(chatId, html)
        })
}

bot.onText(/\/c(.+)/, (msg, [source, match]) => {

    const categoryId = source.substr(2, source.length)

    Position.find({
        category: categoryId
    }).then(postions => {

        const html = postions.map((p, i) => {
            return `<b>${i+1}</b> ${p.name} <strong>${p.cost} ₴</strong>`
        }).join('\n')

        sendHTML(msg.chat.id, html)

    })

})

