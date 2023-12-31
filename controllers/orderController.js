const Order = require("../models/orderModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// get all orders
const getOrders = async (req, res) => {
  const user_id = req.user._id;

  const orders = await Order.find({ user_id }).sort({ createdAt: -1 });

  if (!orders) {
    return res.status(404).json({ error: "No orders" });
  }

 return res.status(200).json(orders);
};

// get a single order
const getOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "No such order" });
  }

  res.status(200).json(order);
};

// customer create an order
const createOrder = async (req, res) => {
  console.log("Creating Order");

  //STRIPE API/PAYMENT API
  const { card } = req.body;
  if (!card) return res.status(400).json({ error: "Something went wrong" });

  //Read Data from req body = cart,sellerId
  const { cart, sellerId } = req.body;

  //Check if Empty
  let emptyFields = [];

  if (!cart) {
    emptyFields.push("cart");
  }
  if (!sellerId) {
    emptyFields.push("sellerId");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //Store to DB
  try {
    await userModel.updateOne(
      { _id: sellerId },
      {
        $inc: { currentQueue: 1 },
      }
    );
    const { currentQueue } = await userModel.findById(sellerId, "currentQueue");
    console.log(currentQueue);
    const order = await Order.create({
      user_id: sellerId,
      cart: cart,
      queueNum: currentQueue,
    });
    console.log("Order Created");
    return res
      .status(200)
      .json({ paymentStatus: "paid", queueNum: currentQueue });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a menu
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Order.findOneAndDelete({ _id: id });

  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }

  res.status(200).json(menu);
};

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such order" });
  }

  const order = await Order.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!order) {
    return res.status(400).json({ error: "No such order" });
  }

  res.status(200).json(order);
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
};
