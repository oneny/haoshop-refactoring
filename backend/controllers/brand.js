const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const Brand = require("../models/Brand");

exports.addBrand = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  let { banners } = req.files;
  const folderName = req.baseUrl.split("/")[2]

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`
    }));
  }

  const brand = await Brand.create({
    name,
    description,
    banners,
    createdBy: req.userId,
  });

  res.status(201).json({ brand });
});

exports.getBrands = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({}).sort({ name: 1 }).exec();

  res.status(200).json({ brands });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  if (!name) return next(new ErrorRes("Params required", 400));

  const brand = await Brand.findOne({ name }).exec();

  res.status(200).json({ brand });
});

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { _id, name, description } = req.body;
  let { banners } = req.files;
  const folderName = req.baseUrl.split("/")[2]

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`
    }));
  }

  const brand = {
    name,
    description,
    banners,
    createdBy: req.userId,
  };

  const updatedBrand = await Brand.findOneAndUpdate({ _id }, brand, {
    new: true,
  }).exec();

  res.status(201).json({ updatedBrand });
});

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const result = await Brand.deleteOne({ _id: id }).exec();

  res.status(201).json({ result, id });
});
