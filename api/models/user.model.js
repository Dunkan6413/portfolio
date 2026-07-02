const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    profile_picture: { type: String },
    tel: { type: String },
    birthDate: { type: String }
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);
module.exports = User;