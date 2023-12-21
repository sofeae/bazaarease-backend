const express = require('express')
const {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder
} = require('../controllers/orderController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all menu routes
router.use(requireAuth)

// GET all orders
router.get('/', getOrders)

//GET a single order
router.get('/:id', getOrder)

// DELETE a menu
router.delete('/:id', deleteOrder)

// UPDATE a order 
router.patch('/:id', updateOrder) 

module.exports = router