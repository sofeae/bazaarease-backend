const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true, // You can set a default value if needed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
