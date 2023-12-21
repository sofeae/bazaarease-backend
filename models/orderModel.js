const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderId: {
    type: String, 
  },
  queueId: {
    type: Number
  },
  date: {
    type: Date,
  },
  total_price: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)