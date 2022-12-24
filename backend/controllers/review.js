const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const Feature = require("../utils/Feature");
const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.upsertReview = asyncHandler(async (req, res, next) => {
  const {
    _id,
    height,
    weight,
    topSize,
    bottomSize,
    shoesSize,
    order,
    product,
    ...others
  } = req.body;
  let { reviewImgs } = req.files;
  const folderName = req.baseUrl.split("/")[2]
  let review;

  if (!!reviewImgs) {
    reviewImgs = reviewImgs.map((file) => `${folderName}/${file.filename}`);
  }

  const reviewObj = {
    ...others,
    order,
    product,
    bodyInfo: {
      height,
      weight,
      topSize,
      bottomSize,
      shoesSize,
    },
    reviewImgs,
  };

  if (_id === "undefined") {
    review = await Review.create(reviewObj);

    await Order.findOneAndUpdate(
      { _id: order, "items._id": new ObjectId(product) },
      { $set: { "items.$.isReviewed": true } }
    ).exec();
  } else {
    review = await Review.findByIdAndUpdate(_id, reviewObj, {
      new: true,
    }).exec();
  }

  const ratings = await Review.aggregate([
    { $match: { product: new ObjectId(product) } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        sum: { $sum: "$rating" },
        avg: { $avg: "$rating" },
      },
    },
  ]).exec();

  await Product.findOneAndUpdate(
    { _id: product },
    {
      $set: { ratings: ratings[0] },
    },
    { upsert: true, new: true }
  );

  res.status(201).json({ review });
});

exports.getReviewsByProductId = asyncHandler(async (req, res, next) => {
  const { pid, ...queryOptions } = req.body;
  if (!pid) return next(new ErrorRes("Params required", 400));

  const total = await Review.find({ product: pid }).countDocuments();
  const reviews = await new Feature(Review.find({ product: pid }), queryOptions)
    .filter()
    .pagination()
    .sort()
    .getQuery();

  res.status(200).json({ total, reviews });
});

exports.getReviewsByUserId = asyncHandler(async (req, res, next) => {
  const total = await Review.find({ user: req.userId }).countDocuments();
  const reviews = await new Feature(Review.find({ user: req.userId }), req.body)
    .filter()
    .pagination()
    .sort()
    .getQuery()
    .populate({ path: "product", select: "brand name color" });

  res.status(200).json({ total, reviews });
});

exports.getReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const review = await Review.findById(id)
    .populate({ path: "product", select: "_id name" })
    .exec();

  res.status(200).json({ review });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const result = await Review.deleteOne({ _id: id }).exec();

  res.status(201).json({ result, id });
});
