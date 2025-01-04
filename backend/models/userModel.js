const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      min: 6,
      max: 64,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',  // Reference to the Profile schema
    },
    possibleRoles: [
      {
        role: {
          type: String,
          required: true,
        },
        probability: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
