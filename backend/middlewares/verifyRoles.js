const ErrorRes = require("../utils/ErrorRes");

exports.verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return next(new ErrorRes("권한없음", 401));

    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return next(new ErrorRes("유효한 권한 아님", 401));

    next();
  };
};
