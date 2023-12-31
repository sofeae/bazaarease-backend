const express = require("express");
const {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  createOrder,
} = require("../controllers/orderController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all menu routes
router.use(requireAuth)

// GET all orders
router.get("/", getOrders);

//GET a single order
router.get("/:id", getOrder);

//POST creata a order
router.post("/", createOrder);

// DELETE a menu
router.delete("/:id", deleteOrder);

// UPDATE a order
router.patch("/:id", updateOrder);

module.exports = router;
