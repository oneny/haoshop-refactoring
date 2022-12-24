const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const slugify = require("slugify");
const Product = require("../models/Product");
const Feature = require("../utils/Feature");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.addProduct = asyncHandler(async (req, res, next) => {
  const { name, price, quantity, description, brand, category,
    discountPrice, code, color, stock } = req.body;

  const stockArray = stock.split(",").map((stock) => ({
    size: stock.split(":")[0],
    qty: stock.split(":")[1],
  }));

  let productImgs = [];
  const folderName = req.baseUrl.split("/")[2]

  if (req.files.length > 0) {
    productImgs = req.files.map((file) => {
      // return { fileName: `${req.baseUrl}/${file.filename}` };
      return { fileName: `${folderName}/${file.filename}` };

    });
  }

  let product = await Product.create({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    brand,
    productImgs,
    category,
    discountPrice,
    code,
    color,
    stock: stockArray,
    createdBy: req.userId,
  });

  product = await product.populate({
    path: "category",
    select: "_id name",
  });

  res.status(201).json({ product });
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({})
    .populate({ path: "category", select: "_id name" })
    .sort({ createdAt: -1 })
    .exec()

  res.status(200).json({ products })
});

exports.getProductsByCategories = asyncHandler(async (req, res, next) => {
  let { cids, brands, ...queryOptions } = req.body;
  let findQuery = {};
  let matchQuery = {};

  if (!cids?.length) {
    brands?.length > 0 && (findQuery = { brand: { $in: brands } });
  } else {
    cids = cids.map((cid) => new ObjectId(cid));

    brands?.length > 0
      ? (findQuery = {
        $and: [{ brand: { $in: brands } }, { category: { $in: cids } }], 
        })
      : (findQuery = { category: { $in: cids } }) 

    matchQuery = { category: { $in: cids } };
  }

  const total = await Product.countDocuments(findQuery);

  const products = await new Feature(Product.find(findQuery), queryOptions)
    .pagination()
    .sort()
    .getQuery();

  const brandData = await Product.aggregate([
    //where
    { $match: matchQuery },
    {
      //select
      $project: {
        brand: 1,
      },
    },
    {
      $group: {
        _id: "$brand",
        total: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]).exec();

  res.status(200).json({ products, brandData, total });
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  const total = await new Feature(Product, req.body)
    .filter()
    .search("product")
    .getQuery()
    .countDocuments();

  const products = await new Feature(Product, req.body)
    .filter()
    .search("product")
    .pagination()
    .sort()
    .getQuery();

  res.status(200).json({ products, total });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const product = await Product.findById(id).exec();

  let relatedProducts=[];
  if(product?.code) relatedProducts = await Product.find({ code: product.code }).exec();

  res.status(200).json({ product, relatedProducts });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { _id, name, price, quantity, description, brand, category,
    discountPrice, code, color, stock } = req.body;

  const stockArray = stock.split(",").map((stock) => ({
    size: stock.split(":")[0],
    qty: stock.split(":")[1],
  }));

  let productImgs = [];
  const folderName = req.baseUrl.split("/")[2]

  if (req.files.length > 0) {
    productImgs = req.files.map((file) => {
      return { fileName: `${folderName}/${file.filename}` };
    });
  }

  const product = {
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    brand,
    category,
    discountPrice,
    code,
    color,
    stock: stockArray,
    createdBy: req.userId,
  };
  if (productImgs?.length > 0) product.productImgs = productImgs;

  //new:true => update된 객체 return 받음
  let updatedProduct = await Product.findOneAndUpdate({ _id }, product, {
    new: true,
  }).exec();

  updatedProduct = await updatedProduct.populate({
    path: "category",
    select: "_id name",
  });

  res.status(201).json({ updatedProduct });

});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  await Product.deleteOne({ _id: id }).exec()

  res.status(201).json({ id });
});