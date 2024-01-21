const mongoose = require("mongoose");
const Menu = require("../models/menuModel");
const User = require("../models/userModel");

async function getCustomerMenu(req, res) {
  const { userId } = req.params;
  console.log(userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "No such menu" });
  }

  const menu = await Menu.find({ user_id: userId });
  console.log(menu);

  if (!menu) {
    return res.status(404).json({ error: "No such menu" });
  }

  res.status(200).json(menu);
}

// get a single status
const getBusinessName = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "Error" });
  }

  res.status(200).json({businessName:user.businessName});
};

module.exports = {
  getCustomerMenu,
  getBusinessName,
};
