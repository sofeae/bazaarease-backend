const express = require("express");
const { getCustomerMenu,getBusinessName } = require("../controllers/customerController");

const router = express.Router();

// GET menus by customer
router.get("/:userId", getCustomerMenu);


// Get Business Name
router.get("/business-name/:userId", getBusinessName)

module.exports = router;
