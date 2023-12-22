const Order = require('../models/orderModel')
const menuOrder = require('../model/menuOrderModel')
const mongoose = require('mongoose')

// get all orders
const getOrders = async (req, res) => {
  const user_id = req.user._id
 
  const orders = await Order.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(orders) 
}

// get a single order
  const getOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order' })
  }

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({ error: 'No such order' })
  }

  res.status(200).json(order)
}

  // customer create an order
  const createOrder = async (req, res) => {
  console.log("Creating Order")
  
  
  const {queueId, name, quantity } = req.body
  //const image = req.file.filename;

  /*let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!desc) {
    emptyFields.push('desc')
  }
  if (!price) {
    emptyFields.push('price')
  }
  if (!stock) {
    emptyFields.push('stock')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }*/

  // add doc to db
  try {
    const user_id = req.user._id
    const order = await menuOrder.create({ queueId, name, quantity, user_id }) //patut const menuOrder ke?
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a menu
  const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order' })
  }

  const order = await Order.findOneAndDelete({ _id: id })

  if (!order) {
    return res.status(400).json({ error: 'No such order' })
  }

  res.status(200).json(menu)
}

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such order' })
  }

  const order = await Order.findOneAndUpdate({ _id: id }, {
    ...req.body 
  })

  if (!order) {
    return res.status(400).json({ error: 'No such order' })
  }

  res.status(200).json(order) 
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder
}