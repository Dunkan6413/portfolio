const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    subtitle: {
      type: String,
      required: true,
      trim: true
    },
    repo: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    readme: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true },
);

const Project = mongoose.model("projects", projectSchema);
module.exports = Project;