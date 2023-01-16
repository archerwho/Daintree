const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const jwt = require("jsonwebtoken");
const crypto = require(`crypto`);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, `Please Enter First Name.`],
    maxLength: [15, `Firstname cannot be more than 15 characters.`],
  },
  lastName: {
    type: String,
    required: [true, `Please Enter Last Name.`],
    maxLength: [15, `Lastname cannot be more than 15 characters.`],
  },
  email: {
    type: String,
    required: [true, `Email is Must.`],
    match: /.+\@.+\..+/,
    unique: [true],
  },
  mobileNumber: {
    type: Number,
    required: [true],
    min: [1000000000],
    max: [9999999999],
  },
  password: {
    type: String,
    required: [true, `Please enter a Password.`],
    maxLength: [15, `Password cannot contain more than 15 characters.`],
    select: [false],
  },
  gender: {
    type: String,
    required: [false],
  },
  avatar: {
    public_id: {
      type: String,
      required: [true],
    },
    url: {
      type: String,
      required: [true],
    },
  },
  typeOfUser: {
    type: String,
    default: `user`,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hashing the password using bcryptjs
userSchema.pre(`save`, async function (next) {
  if (!this.isModified(`password`)) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JsonWebToken
userSchema.methods.getJWToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Check Password
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Resetting the Password (generating password token)
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString(`hex`);
  //hashing and adding to resetPasswordToken in userSchema
  this.resetPasswordToken = crypto
    .createHash(`sha256`)
    .update(resetToken)
    .digest(`hex`);

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = new mongoose.model(`User`, userSchema);
