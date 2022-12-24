const ErrorRes = require("../utils/ErrorRes");
const Feature = require("../utils/Feature");
const asyncHandler = require("../middlewares/asyncHandler");
const Collection = require("../models/Collection");

exports.addCollection = asyncHandler(async (req, res, next) => {
  const { name, description, brand, launched, director, country, shop } =
    req.body;
  let { banners, cards } = req.files;
  const folderName = req.baseUrl.split("/")[2];

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`,
    }));
  }

  if (!!cards) {
    cards = cards.map((card) => ({
      img: `${folderName}/${card.filename}`,
    }));
  }

  const collection = await Collection.create({
    name,
    description,
    brand,
    launched,
    director,
    country,
    shop,
    banners,
    cards,
    createdBy: req.userId,
  });

  res.status(201).json({ collection });
});

exports.getAllCollections = asyncHandler(async (req, res, next) => {
  const collections = await Collection.find({}).sort({ createdAt: -1 }).exec();

  res.status(200).json({ collections });
});

exports.getCollections = asyncHandler(async (req, res, next) => {
  // const total = await Collection.find({}).countDocuments();
  const total = req.body.keyword
    ? await Collection.find({ brand: req.body.keyword }).countDocuments()
    : await Collection.find({}).countDocuments();

  const collections = await new Feature(Collection, req.body)
    .filter()
    .search()
    .pagination()
    .sort()
    .getQuery();

  res.status(200).json({ total, collections });
});

exports.getCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const collection = await Collection.findById(id).exec();

  res.status(200).json({ collection });
});

exports.updateCollection = asyncHandler(async (req, res, next) => {
  const { _id, name, description, brand, launched, director, country, shop } =
    req.body;
  let { banners, cards } = req.files;
  const folderName = req.baseUrl.split("/")[2];

  if (!!banners) {
    banners = banners.map((banner) => ({
      img: `${folderName}/${banner.filename}`,
    }));
  }
  if (!!cards) {
    cards = cards.map((card) => ({
      img: `${folderName}/${card.filename}`,
    }));
  }

  const collection = {
    name,
    description,
    brand,
    launched,
    director,
    country,
    shop,
    banners,
    cards,
    createdBy: req.userId,
  };

  const updatedCollection = await Collection.findOneAndUpdate(
    { _id },
    collection,
    {
      new: true,
    }
  ).exec();

  res.status(201).json({ updatedCollection });
});

exports.deleteCollection = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const result = await Collection.deleteOne({ _id: id }).exec();

  res.status(201).json({ result, id });
});
