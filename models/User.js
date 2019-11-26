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
    restoringCode: {
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