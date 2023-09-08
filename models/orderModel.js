const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    pickup_add: {
      type: String,
      required: [true, "Please add an address"],
    },
    destination: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: true,
    },
    service_type: {
      type: String,
      required: true,
    },
    additional_info: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
