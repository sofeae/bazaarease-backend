const mongoose = require("mongoose");
const Menu = require("../models/menuModel");

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

module.exports = {
  getCustomerMenu,
};
