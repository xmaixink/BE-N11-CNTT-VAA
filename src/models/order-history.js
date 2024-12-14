const mongoose = require("mongoose");

const OrderHistorySchema = mongoose.Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Chưa thanh toán", "Đã thanh toán"],
      default: "Chưa thanh toán",
    },
    userId: {
      type: String,
      required: false,
    },
    vendorId: {
      type: String,
      required: false,
    },
    method: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    side_dishes: {
      type: Array,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
    salesAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    orderCount: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const OrderHistory = mongoose.model("OrderHistory", OrderHistorySchema);

module.exports = OrderHistory;
