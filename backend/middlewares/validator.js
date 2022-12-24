const { check, validationResult } = require("express-validator");

exports.validateSignup = [
  check("username").notEmpty().withMessage("username을 입력하세요"),
  check("email").isEmail().withMessage("유효하지 않은 이메일 입니다"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 6자리 이상이어야 합니다"),
];

exports.validateSignin = [
  check("email").isEmail().withMessage("유효하지 않은 이메일 입니다"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 6자리 이상이어야 합니다"),
];

exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0)
    return res.status(400).json({ error: errors.array()[0].msg });

  next();
};
