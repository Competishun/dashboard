const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Counter = require("./counter.models");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // index :true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // gender: {
    //   type: String,
    //   enum: ["male", "female", "none"],
    //   default: "male",
    // },
    mobile: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
// check if the email is modified and if it is, increment the userId counter
//   if (this.isModified("email")) {
//     const counter = await Counter.findOneAndUpdate(
//       { _id: "userIdCounter" },
//       { $inc: { sequence_value: 1 } },
//       { new: true, upsert: true }
//     );
//     this.userId = counter.sequence_value;
//   }
  next();
});
// method to compare a entered password with the hashed password in our database
userSchema.methods.isCorrectPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userId: this.userId,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const User = mongoose.model("User", userSchema);

module.exports = User;
