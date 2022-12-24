const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
      },
      email: {
        type: String,
      },
      mobile: { type: String },
    },

    address: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 50,
      },
      contactNumber: {
        type: String,
        required: true,
        trim: true,
      },
      zonecode: {
        type: String,
        required: true,
        trim: true,
      },
      address1: {
        type: String,
        required: true,
        trim: true,
        max: 100,
      },
      address2: {
        type: String,
        required: true,
        trim: true,
        max: 100,
      },
      claim: {
        type: String,
        max: 200,
      },
    },

    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        brand: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        img: {
          type: String,
        },
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        isReviewed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    usedPoint: {
      type: Number,
    },

    paymentPrice: {
      type: Number,
    },

    paymentType: {
      type: String,
      enum: ["card"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },

    refundRequest: { type: Number, default: 0 },

    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
