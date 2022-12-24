const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    color: {
      type: String,
    },

    description: {
      type: String,
      trim: true,
    },

    productImgs: [{ fileName: { type: String } }],

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    stock: [{ size: { type: String }, qty: { type: Number } }],

    grossSales: {
      type: Number,
    },
    salesRate: {
      type:Number,
    },

    ratings: {
      total: { type: Number },
      sum: { type: Number },
      avg: { type: Number },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
