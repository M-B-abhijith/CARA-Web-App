const mongoose = require("mongoose");

const jobRoleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Please add an overview for the job role"],
      trim: true,
    },
    averageSalary: {
      entryLevel: {
        type: String, // e.g., "$50,000-$70,000"
        required: true,
      },
      midLevel: {
        type: String, // Optional mid-level salary range
      },
      seniorLevel: {
        type: String, // Optional senior-level salary range
      },
    },
    keyResponsibilities: {
      type: [String], // List of responsibilities
      required: true,
    },
    requiredTechStack: {
      languages: {
        type: [String], // e.g., ["HTML", "CSS", "JavaScript"]
        required: true,
      },
      frameworks: {
        type: [String], // e.g., ["React", "Angular", "Vue"]
        required: true,
      },
      tools: {
        type: [String], // e.g., ["Git", "Webpack", "Babel"]
        required: true,
      },
      databases: {
        type: [String], // e.g., ["MySQL", "MongoDB"]
        required: true,
      },
      others: {
        type: [String], // e.g., ["APIs", "GraphQL", "Docker"]
        required: true,
      },
    },
    educationalBackground: {
      degree: {
        type: String, // e.g., "Bachelor’s in Computer Science"
        required: true,
      },
      certifications: {
        type: [String], // List of certifications
        required: true,
      },
    },
    careerGrowth: {
      type: [String], // e.g., ["Junior Web Developer → Senior Web Developer → Lead Web Developer"]
      required: true,
    },
    pros: {
      type: [String], // List of pros
      required: true,
    },
    cons: {
      type: [String], // List of cons
      required: true,
    },
    futureTrends: {
      type: [String], // List of future trends
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobRole", jobRoleSchema);
