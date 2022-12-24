const ErrorRes = require("../utils/ErrorRes");
const Feature = require("../utils/Feature");
const asyncHandler = require("../middlewares/asyncHandler");
const Lookbook = require("../models/Lookbook");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addLookbook = asyncHandler(async (req, res, next) => {
  const { name, description, products, modelInfo, wearingSize } = req.body;
  let { banners } = req.files;

  const pids = products.split(",").map((product) => new ObjectId(product));

  const folderName = req.baseUrl.split("/")[2]

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`,
    }));
  }

  const lookbook = await Lookbook.create({
    name,
    description,
    modelInfo,
    wearingSize,
    products: pids,
    banners,
    createdBy: req.userId,
  });

  res.status(201).json({ lookbook });
});

exports.getAllLookbooks = asyncHandler(async (req, res, next) => {
  const lookbooks = await Lookbook.find({}).sort({ createdAt: -1 }).exec();

  res.status(200).json({ lookbooks });
});

exports.getNewLookbooks = asyncHandler(async (req, res, next) => {
  const lookbooks = await Lookbook.find({})
    .limit(4)
    .populate("products")
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({ lookbooks });
});

exports.getLookbooks = asyncHandler(async (req, res, next) => {
  const total = await Lookbook.find({}).countDocuments();
  const lookbooks = await new Feature(Lookbook, req.body)
    .filter()
    .pagination()
    .sort()
    .getQuery();

  res.status(200).json({ total, lookbooks });
});

exports.getLookbook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const lookbook = await Lookbook.findById(id)
    .populate("products", "_id brand color name price discountPrice productImgs")
    .exec();

  res.status(200).json({ lookbook });
});

exports.updateLookbook = asyncHandler(async (req, res, next) => {
  const { _id, name, description, products, modelInfo, wearingSize } = req.body;
  let { banners } = req.files;

  const pids = products.split(",").map((product) => new ObjectId(product));
  const folderName = req.baseUrl.split("/")[2]

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`
    }));
  }

  const lookbook = {
    name,
    description,
    modelInfo,
    wearingSize,
    products: pids,
    banners,
    createdBy: req.userId,
  };

  const updatedLookbook = await Lookbook.findOneAndUpdate({ _id }, lookbook, {
    new: true,
  }).exec();

  res.status(201).json({ updatedLookbook });
});

exports.deleteLookbook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const result = await Lookbook.deleteOne({ _id: id }).exec();

  res.status(201).json({ result, id });
});
