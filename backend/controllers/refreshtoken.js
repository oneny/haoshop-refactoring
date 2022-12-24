const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(new ErrorRes("refreshToken 없음", 401));

  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { HttpOnly: true, SameSite: "None", Secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const hackedUser = await User.findById(decoded.id).exec();
    hackedUser.refreshToken = [];

    await hackedUser.save();

    return next(new ErrorRes("refreshToken 재사용됨", 403));
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
        return next(new ErrorRes("만료된 refreshToken", 403));
      }

      // refreshToken 유효하면
      const accessToken = foundUser.generateAccessToken();
      const newRefreshToken = foundUser.generateRefreshToken();

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

      await foundUser.save();

      res.cookie("jwt", newRefreshToken, {
        HttpOnly: true,
        Secure: true,
        SameSite: "None",
        MaxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken });
    }
  );
});
