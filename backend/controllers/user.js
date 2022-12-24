const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const UserAddress = require("../models/Address");
const MONTHS = require("../utils/MONTHS");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const { perPage, currentPage } = req.body;
  const users = await User.aggregate([
    { $match: {} },
    {
      //select
      $project: {
        _id: 1,
        roles: 1,
        email: 1,
        username: 1,
        profileImg: 1,
        mobile: 1,
        point: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ])
    .skip(perPage * (currentPage - 1))
    .limit(perPage);

  const total = await User.find({}).countDocuments();

  res.status(200).json({ users, total });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const userAddress = await UserAddress.findOne({ user: req.userId }).exec();
  const foundUser = await User.findById(req.userId).exec();

  const {
    refreshToken,
    resetPasswordToken,
    resetPasswordExpire,
    roles,
    ...user
  } = foundUser._doc;

  res.status(200).json({ user, userAddress });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { _id, roles, email, mobile, point, username } = req.body;
  const folderName = req.baseUrl.split("/")[2];
  let profileImg = "";
  if (req.file) profileImg = `${folderName}/${req.file.filename}`;

  const user = {
    _id,
    roles: JSON.parse(roles),
    email,
    mobile,
    point: Number(point),
    username,
    profileImg,
  };

  const updatedUser = await User.findOneAndUpdate({ _id }, user, {
    new: true,
  }).exec();

  res.status(201).json({ updatedUser });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorRes("Params required", 400));

  await UserAddress.deleteOne({ user: id }).exec();
  await User.deleteOne({ _id: id }).exec();

  res.status(201).json({ id });
});

//GET USER STATS
exports.getUserStats = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  const orderedData = data.sort(function (a, b) {
    return a._id - b._id;
  });

  const userStats = orderedData.map((item) => ({
    month: MONTHS[item._id - 1],
    user: item.total,
  }));

  res.status(200).json({ userStats });
});
