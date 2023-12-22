const express = require("express");
const { getCustomerMenu } = require("../controllers/customerController");

const router = express.Router();

// GET menus by customer
router.get("/:userId", getCustomerMenu);

module.exports = router;
