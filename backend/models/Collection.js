const mongoose = require("mongoose");
const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
    },
    launched: {
      type: String,
    },
    director: {
      type: String,
    },
    country: {
      type: String,
    },
    shop: {
      type: String,
    },

    banners: [
      {
        img: { type: String },
      },
    ],
    cards: [
      {
        img: { type: String },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
