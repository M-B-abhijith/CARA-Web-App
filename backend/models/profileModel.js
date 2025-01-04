const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User schema
      required: true,
    },
    profileSummary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 150,  // Limiting it to a small description (you can adjust this limit)
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add phone number"],
      trim: true,
    },
    skills: {
      languages: [String],
      frameworks: [String],
      tools: [String],
      databases: [String],
      others: [String],
    },
    projects: [String],  // List of projects as string points
    education: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String],
      trim: true,
    },
    certifications: {
      type: [String],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
