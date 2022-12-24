const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const UserAddress = require("../models/Address");

exports.upsertAddress = asyncHandler(async (req, res, next) => {
  const { address } = req.body;

  if (!address) return next(new ErrorRes("주소 전송 안됨", 400));

  if (address._id) {
    const userAddress = await UserAddress.findOneAndUpdate(
      { user: req.userId, "addresses._id": address._id },
      {
        $set: {
          "addresses.$": address,
        },
      },
      { new: true }
    ).exec();

    res.status(201).json({ userAddress });
  } else {
    const userAddress = await UserAddress.findOneAndUpdate(
      { user: req.userId },
      {
        $push: {
          addresses: address,
        },
      },
      { new: true, upsert: true }
    ).exec();

    res.status(201).json({ userAddress });
  }
});

exports.getAddresses = asyncHandler(async (req, res, next) => {
  const userAddress = await UserAddress.findOne({ user: req.userId }).exec();

  res.status(200).json({ userAddress });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  const userAddress = await UserAddress.findOneAndUpdate(
    { user: req.userId },
    { $pull: { addresses: { _id: id } } },
    { new: true }
  ).exec();

  res.status(200).json({ userAddress });
});
