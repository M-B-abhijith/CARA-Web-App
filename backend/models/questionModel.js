const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,  // The actual question text
    },
    options: [
      {
        type: String,
        required: true,  // The possible options for the question
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Questionnaire", questionnaireSchema);
