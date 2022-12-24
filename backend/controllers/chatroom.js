const asyncHandler = require("../middlewares/asyncHandler");
const ErrorRes = require("../utils/ErrorRes");
const Chatroom = require("../models/Chatroom");
const ROLES = require("../config/roleList");
const User = require("../models/User");

exports.addChatroom = asyncHandler(async (req, res, next) => {
  const foundChatroom = await Chatroom.find({
    members: { $in: [req.body.userId] },
  })
    .populate("members", "username profileImg")
    .exec();

  if (foundChatroom.length > 0) return res.status(201).json(foundChatroom);

  const CSRs = await User.find({ "roles.CSR": 3693 }).select({ _id: 1 }).exec();

  const members = [...CSRs, req.body.userId];

  await Chatroom.create({
    members: members,
  });

  const chatroom = await Chatroom.find({
    members: { $in: [req.body.userId] },
  })
    .populate("members", "username profileImg")
    .exec();

  res.status(201).json(chatroom);
});

exports.getChatrooms = asyncHandler(async (req, res, next) => {
  const chatrooms = await Chatroom.find({
    members: { $in: [req.params.userId] },
  })
    .populate("members", "username profileImg")
    .exec();

  res.status(200).json(chatrooms);
});