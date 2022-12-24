const ErrorRes = require("../utils/ErrorRes");
const Feature = require("../utils/Feature");
const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const MONTHS = require("../utils/MONTHS");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function updatePromise(condition, update) {
  return new Promise((resolve, reject) => {
    Product.findOneAndUpdate(condition, update, { new: true })
      .catch((err) => reject(err))
      .then((result) => resolve(result));
  });
}

exports.addOrder = asyncHandler(async (req, res, next) => {
  const result = await Cart.deleteOne({ user: req.userId }).exec();

  let promiseArray = [];

  const { items, totalPrice, usedPoint } = req.body;

  items.forEach((item) => {
    let condition, update;

    condition = {
      _id: item._id,
      "stock.size": item.size,
    };
    update = {
      $inc: {
        grossSales: +item.qty * item.price,
        salesRate: +item.qty,
        "stock.$.qty": -item.qty,
      },
    };

    promiseArray.push(updatePromise(condition, update));
  });

  Promise.all(promiseArray)
    .catch((err) => next(new ErrorRes(err, 400)))
    .then((response) => console.log(response));

  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { $inc: { point: +(totalPrice / 100).toFixed() - usedPoint } }
  );

  req.body.orderStatus = [
    {
      type: "ordered",
      date: new Date(),
      isCompleted: true,
    },
    {
      type: "packed",
      isCompleted: false,
    },
    {
      type: "shipped",
      isCompleted: false,
    },
    {
      type: "delivered",
      isCompleted: false,
    },
  ];

  req.body.paymentStatus = "completed";

  const order = await Order.create(req.body);

  res.status(201).json({ order });
});

exports.getOrdersForAdmin = asyncHandler(async (req, res, next) => {
  const orders = await new Feature(Order.find({}), req.body)
    .pagination()
    .sort()
    .getQuery()
    .exec();

  const total = await Order.find({}).countDocuments();

  res.status(200).json({ orders, total });
});

exports.getOrderStats = asyncHandler(async (req, res, next) => {
  const orderStats = await Order.aggregate([
    { $match: { "user._id": new ObjectId(req.userId) } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        priceAmount: { $sum: "$totalPrice" },
        refundCount: { $sum: "$refundRequest" },
      },
    },
  ]).exec();

  res.status(200).json({ orderStats });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const { status, ...queryOptions } = req.body;
  let findQuery = {};

  switch (status) {
    case "delivered":
      findQuery = {
        "user._id": req.userId,
        refundRequest: 0,
        orderStatus: {
          $elemMatch: { $and: [{ type: "delivered" }, { isCompleted: true }] },
        },
      };
      break;
    case "refund":
      findQuery = { "user._id": req.userId, refundRequest: true };
      break;
    default:
      findQuery = {
        "user._id": req.userId,
        // refundRequest: 0,
        // orderStatus: {
        //   $elemMatch: { $and: [{ type: "delivered" }, { isCompleted: false }] },
        // },
      };
  }

  const total = await Order.find(findQuery).countDocuments();
  const orders = await new Feature(Order.find(findQuery), queryOptions)
    .pagination()
    .sort().getQuery();

  res.status(200).json({ total, orders });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));
  const order = await Order.findById(id).exec();

  res.status(200).json({ order });
});

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  let { _id, type, paymentStatus } = req.body;
  if (!type) type = "delivered";

  //orderStatus ["ordered", "packed", "shipped", "delivered"] 변경
  const updatedOrder = await Order.findOneAndUpdate(
    { _id, "orderStatus.type": type },
    {
      $set: {
        "orderStatus.$": [{ type, date: new Date(), isCompleted: true }],
        paymentStatus,
      },
    },
    { new: true }
  ).exec();

  res.status(201).json({ updatedOrder });
});

exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { _id, paymentStatus } = req.body;

  // paymentStatus ["pending", "completed", "cancelled", "refund"] 변경
  const updatedOrder = await Order.findOneAndUpdate(
    { _id },
    {
      $set: {
        paymentStatus,
      },
    },
    { new: true }
  ).exec();

  res.status(201).json({ updatedOrder });
});

exports.refundRequest = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;

  // paymentStatus ["pending", "completed", "cancelled", "refund"] 변경
  const updatedOrder = await Order.findOneAndUpdate(
    { _id },
    {
      $set: {
        refundRequest: 1,
      },
    },
    { new: true }
  ).exec();

  res.status(201).json({ updatedOrder });
});

exports.getMonthlyIncome = asyncHandler(async (req, res, next) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const data = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYear },
        ...(productId && { "items.$": { $elemMatch: { _id: productId } } }),
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        totalQty: "$totalQty",
        totalPrice: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        salesRate: { $sum: "$totalQty" },
        grossSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  const orderedData = data.sort(function (a, b) {
    return a._id - b._id;
  });

  const income = orderedData.map((item) => ({
    month: MONTHS[item._id - 1],
    판매량: item.salesRate,
    매출: item.grossSales,
  }));

  res.status(200).json({ income });
});
