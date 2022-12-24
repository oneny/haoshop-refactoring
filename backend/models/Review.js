const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    purchasedSize: { type: String },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    bodyInfo: {
      height: Number,
      weight: Number,
      topSize: String,
      bottomSize: String,
      shoesSize: String,
    },

    reviewImgs: [String],
    comment: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
