const express = require("express");
const {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getCompletedOrders,
  getIncompletedOrders,
} = require("../controllers/orderController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all menu routes
// router.use(requireAuth)

// GET all orders
router.get("/", requireAuth, getOrders);


// GET Incompleted orders
router.get("/incompleted", requireAuth, getIncompletedOrders);

// GET Completed orders
router.get("/completed", requireAuth, getCompletedOrders);

//GET a single order
router.get("/:id", requireAuth, getOrder);

//POST creata a order
router.post("/", createOrder);

// DELETE a menu
router.delete("/:id", requireAuth, deleteOrder);

// UPDATE a order
router.patch("/:id", requireAuth, updateOrder);

module.exports = router;
