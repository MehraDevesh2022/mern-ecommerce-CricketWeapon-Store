const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,

    validate: [validator.isEmail, "Please Enter a valid Email"], // validator.isEmail cheack given email String and after varfiying is email correct type or not of true
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should have more than 4 characters"],
    select: false, // this will make sure password is sended with data to anyone not even admin when he req for user data
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//password hash>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  this is for user  password hashing . this function will run every time when user data will change
userSchema.pre("save", async function (next) {
  // without this if statment password hashed each time when data modifeid . thereFore making this if loop
  if (this.isModified("password") === false) {
    next();
  }
  // if password upadated or created then ....
  this.password = await bcrypt.hash(this.password, 10); // this points to individule user
});

//JWt>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// now make JWT TOKEN for User Who Will Logged int => JWT has three thing => Header{type of jwt , algo details} + payLoad{contain user data eg id , token expiry date , generated date so on} + Seceret{A seceret key in hashed form and keyStore in srever for verification}
// making method using Mongoose method property => getJWTToken
userSchema.methods.getJWTToken = function () {
  // we sending in payLoad : Toeknexpiry , userId , or Seceret key, Along with header has algo name , type of JWT
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// cerating Compare Password method >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // this function will cheack when user login with palin password and bcrypt.compare will cheack that password with hashed password in DataBase.
};

// Generating Password Reset Token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token for reset password just like otp kinda of
  const resetPassToken = crypto.randomBytes(20).toString("hex"); // crypto.randomBytes will create random bytes of bufffer value toString("hex") will convert that buffer inot hex string
  // Hashing and adding resetPasswordToken to userSchema

  // resetPasswordToken and  resetPasswordExpire are user schema definde over now we adding value resetPassToken token  and expiry of that token . when user will try resetpass  then resetPasswordToken and resetPasswordExpire will store and also reset token send through nodmailer to user and when user add that token . if token will match then he will able to rseet pass
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPassToken)
    .toString("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //  resetPasswordExpire : it will make sure how much time this reset token will valid for reseting pass eg 5 min or 3min

  return resetPassToken;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
