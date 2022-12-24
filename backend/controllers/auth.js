const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const ROLES = require("../config/roleList");
const User = require("../models/User");
const axios = require("axios");

const sendToken = asyncHandler(async (req, res, user) => {
  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  const cookies = req.cookies;

  //쿠키에 토큰있으면 기존 user의 refreshToken 제외
  let newRefreshTokenArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);

  //쿠키에는 refresh토큰있는데 유저를 못찾는다? -> 토큰 재사용임 -> db refreshToken초기화
  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) newRefreshTokenArray = [];

    //쿠키 초기화
    res.clearCookie("jwt", { HttpOnly: true, SameSite: "None", Secure: true });
  }

  // newRefreshToken db저장
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await user.save();

  // newRefreshToken 쿠키 저장
  res.cookie("jwt", newRefreshToken, {
    HttpOnly: true,
    Secure: true,
    SameSite: "None",
    MaxAge: 24 * 60 * 60 * 1000,
  });

  // Send token to user
  const { _id, username, profileImg, provider, kakaoToken } = user._doc;
  const roles = Object.values(user._doc.roles).filter(Boolean);

  res.status(200).json({
    accessToken,
    kakaoToken,
    user: {
      _id,
      roles,
      provider,
      username,
      // profileImg,
    },
  });
});

exports.adminSignin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorRes("Email 또는 Password 입력하세요", 400));

  const user = await User.findOne({ email }).select("+password +role").exec();
  if (!user) return next(new ErrorRes("존재하지 않는 유저", 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorRes("잘못된 비밀번호", 400));

  const isAdmin = Object.values(user.roles)
    .filter(Boolean)
    .find((role) => role === ROLES.ADMIN);

  if (!isAdmin) return next(new ErrorRes("관리자가 아닙니다", 401));

  sendToken(req, res, user);
});

////////////////////////////////////////////////////////////////////////////

exports.kakao = asyncHandler(async (req, res, next) => {
  let code = req.query.code;

  const response = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );

  const kakaoToken = response.data.access_token;

  const response2 = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  const { email, profile } = response2.data.kakao_account;

  let foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    foundUser.kakaoToken = kakaoToken;
    sendToken(req, res, foundUser);
  } else {
    let user = await User.create({
      username: profile.nickname,
      email,
      profileImg: profile.profile_image_url,
      provider: "kakao",
      kakaoToken,
    });
    sendToken(req, res, user);
  }
});

////////////////////////////////////////////////////////////////////////////

exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorRes("Email 또는 Password 입력하세요", 400));

  const user = await User.findOne({ email }).select("+password").exec();
  if (!user) return next(new ErrorRes("존재하지 않는 유저", 400));
  if (user?.provider) return next(new ErrorRes("소셜 로그인 하세요", 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorRes("잘못된 비밀번호", 400));

  sendToken(req, res, user);
});

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username) return next(new ErrorRes("username 입력하세요", 400));
  if (!email || !password)
    return next(new ErrorRes("Email 또는 Password 입력하세요", 400));

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return next(new ErrorRes("이미 가입한 유저", 409));

  const user = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({ success: `New user ${username} created!` });
});

exports.signout = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { HttpOnly: true, SameSite: "None", Secure: true });
    return res.status(204).json("로그아웃");
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();

  res.clearCookie("jwt", { HttpOnly: true, SameSite: "None", Secure: true });

  res.status(204).json("로그아웃");
});

exports.matchEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res
      .status(200)
      .json({ msg: `${email} 은 사용가능한 이메일입니다.` });
  }

  res.status(200).json({ msg: `${email} 은 사용중인 이메일입니다.` });
});

exports.matchPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorRes("Email 또는 Password 입력하세요", 400));

  const user = await User.findOne({ email }).select("+password").exec();
  if (!user) return next(new ErrorRes("존재하지 않는 유저", 400));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorRes("잘못된 비밀번호", 400));

  res.status(200).json({ result: true });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { email, username, mobile, password } = req.body;

  if (password.length > 5) {
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          username,
          password,
          mobile,
        },
      }
    );
  } else {
    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          username,
          mobile,
        },
      }
    );
  }

  return res.status(200).json({ result: true });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) return next(new ErrorRes("Email 전송 실패"), 404);

  const resetToken = user.generateResetPasswordToken();

  user.save();

  const resetUrl = `http://localhost:3000/reset_password/${resetToken}`;
  const message = `<h1>비밀번호 초기화 요청</h1>
    <p>아래 링크로 접속 후 비밀번호 초기화 하세요:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

  try {
    sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ success: true, msg: "Email Sent" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();

    return next(new ErrorRes(err, 500));
  }
});

exports.resetPassword = (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).exec((err, user) => {
    if (err) next(err);
    if (!user) return next(new ErrorRes("유효하지 않은 토큰", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save();

    res.status(201).json({
      success: true,
      msg: "비밀번호 변경 선공"
    });
  });
};
