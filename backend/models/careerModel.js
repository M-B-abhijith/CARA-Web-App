const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    jobOverview: {
      type: String,
      required: true,
    },
    salary: {
      entryLevel: {
        type: String,
        required: true,
      },
      midLevel: {
        type: String,
        required: true,
      },
      seniorLevel: {
        type: String,
        required: true,
      },
    },
    responsibilities: {
      type: [String],
      required: true,
    },
    techStack: {
      languages: [String],
      frameworks: [String],
      tools: [String],
      databases: [String],
      others: [String],
    },
    education: {
      degree: {
        type: String,
        required: true,
      },
      certifications: {
        type: [String],
        required: true,
      },
    },
    careerGrowth: {
      type: [String],
      required: true,
    },
    prosAndCons: {
      pros: [String],
      cons: [String],
    },
    futureTrends: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
