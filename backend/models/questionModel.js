const mongoose = require("mongoose");

const questionnaireSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User schema
      required: true,
    },
    marks: {
      subject1: {
        type: Number,
        required: true,
      },
      subject2: {
        type: Number,
        required: true,
      },
      subject3: {
        type: Number,
        required: true,
      },
      subject4: {
        type: Number,
        required: true,
      },
      subject5: {
        type: Number,
        required: true,
      },
    },
    mcqResponses: [
      {
        question: {
          type: String,
          required: true,
        },
        selectedOption: {
          type: String,
          required: true,
        },
      },
    ],
    predictedCareers: [
      {
        career: {
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

module.exports = mongoose.model("Questionnaire", questionnaireSchema);
