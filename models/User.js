const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema( {
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    categorySubscribes: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    restoringCode: {
        type: String,
        default: ''
    },
    telegramTag: {
        type: String,
        default: ''
    },
    chatId: {
        type: String,
        default: ''
    },
    imageSrc: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'customer'
    },
    ordersList: [
        {
            date: {
                type: Date
            },
            waiter: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            customer: {
                ref: 'users',
                type: Schema.Types.ObjectId
            },
            table: {
                ref: 'tables',
                type: Schema.Types.ObjectId
            }
        }
    ],
    default: []
} )
 
module.exports = mongoose.model('users', userSchema)