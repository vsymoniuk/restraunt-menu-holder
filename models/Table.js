const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    places: {
        type: Number,
        required: true
    },
    isBusy: {
        type: Boolean,
        default: false
    },
    waiter: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    customer: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('tables', tableSchema)