const mongoose = require('mongoose');

const { Schema } = mongoose;

const fruitSchema = new Schema({
    id: String,
    name: String,
    amount: Number,
    weight: Number,
    unitPrice: Number,
    distributor: String,
    expiration: Date
})
module.exports = mongoose.model('fruit', fruitSchema)