const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      logo: {
        type: String, // URL or file path to the logo
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
