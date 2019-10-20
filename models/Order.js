const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    positionsList: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    waiter: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    customer: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('orders', orderSchema)