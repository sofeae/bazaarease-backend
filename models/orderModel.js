const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    cart: {
      type: Object,
    },
    user_id: {
      type: String,
      required: true,
    },
    queueNum: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    totalAmount: {
      type: Number,  // Assuming totalAmount is a numeric value
    },
  },
  { timestamps: true }
);

// Middleware to calculate totalAmount before saving the order
orderSchema.pre("save", function (next) {
  if (this.cart && Object.keys(this.cart).length > 0) {
    // Calculate totalAmount based on the products in the cart
    this.totalAmount = Object.values(this.cart).reduce(
      (total, product) => total + product.amount * product.price,
      0
    );
  } else {
    // Default to 0 if the cart is empty or undefined
    this.totalAmount = 0;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
