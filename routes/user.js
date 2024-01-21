const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// Import your controller functions
const { loginUser, signupUser, updateStoreStatus, getStoreStatus } = require("../controllers/userController");

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Update store status route
router.patch("/update-store-status",requireAuth, updateStoreStatus);

// Get store status route
router.get("/get-store-status/:id", getStoreStatus);


module.exports = router;