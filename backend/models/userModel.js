const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [64, "Password cannot exceed 64 characters"],
    },
    quizA: {
      academicMarks: {
        type: Number,
        min: 0,
        max: 100,
        default: null, // Allows null until the quiz is taken
      },
    },
    quizB: {
      personalTraits: [
        {
          question: { type: String },
          answer: { type: String },
        },
      ],
      default: [], // Empty array until the quiz is taken
    },
    careerOptions: {
      type: [String], // List of possible career suggestions
      default: [], // Empty array until results are generated
    },
    roadmap: {
      type: String, // URL or description of the selected roadmap
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("User", userSchema);
