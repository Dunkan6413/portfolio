const mongoose = require("mongoose");

const techSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      required: true,
      trim: true
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  },
  { timestamps: true }
);

const Tech = mongoose.model("techs", techSchema);
module.exports = Tech;