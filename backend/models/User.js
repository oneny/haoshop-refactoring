const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      // required: [true, "Please add a password"],
      // minlength: 6,
      select: false,
    },
    roles: {
      USER: {
        type: Number,
        default: 2001,
      },
      ADMIN: Number,
      ROOT: Number,
      CSR: Number,
    },
    mobile: { type: String },
    profileImg: { type: String },

    point: { type: Number, default: 0 },

    provider: String,
    kakaoToken:String,
    
    refreshToken: [String],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//PRE-SAVE
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.$set.password) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this._update.$set.password = await bcrypt.hash(
    this._update.$set.password,
    salt
  );
  next();
});

//CUSTOM METHOD
UserSchema.methods = {
  matchPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  generateAccessToken: function () {
    // { USER: 2001 } -> [ 2001, undefined, undefined ] -> [ 2001 ]
    const roles = Object.values(this.roles).filter(Boolean);

    return jwt.sign({ id: this._id, roles }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
  },

  generateRefreshToken: function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });
  },

  generateResetPasswordToken: function () {
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //10min

    return resetPasswordToken;
  },
};

module.exports = mongoose.model("User", UserSchema);
