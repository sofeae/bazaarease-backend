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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
