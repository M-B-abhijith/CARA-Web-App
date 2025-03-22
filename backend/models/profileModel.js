// const mongoose = require("mongoose");

// const profileSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,  // Assuming you're using ObjectId for user references
//       required: true,
//       ref: "User",  // Make sure this matches your User model's name
//     },
//     name: {
//       type: String,
//       required: [true, "Please add a name"],
//       trim: true,
//     },
//     role: {
//       type: String,
//       required: [true, "Please add a role"],
//       trim: true,
//     },
//     contact: {
//       email: {
//         type: String,
//         required: [true, "Please add an email"],
//         trim: true,
//       },
//       phone: {
//         type: String,
//         required: [true, "Please add a phone number"],
//         trim: true,
//       },
//     },
//     profileSummary: {
//       type: String,
//       required: [true, "Please add a profile summary"],
//       trim: true,
//     },
//     skills: {
//       languages: {
//         type: [String],
//         required: true,
//       },
//       frameworks: {
//         type: [String],
//         required: true,
//       },
//       tools: {
//         type: [String],
//         required: true,
//       },
//       databases: {
//         type: [String],
//         required: true,
//       },
//       others: {
//         type: [String],
//         required: true,
//       },
//     },
//     projects: {
//       type: [String],
//       required: true,
//     },
//     education: {
//       type: [String],
//       required: true,
//     },
//     achievementsAndCertifications: {
//       type: [String],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Profile", profileSchema);



const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
      trim: true,
    },
    contact: {
      email: {
        type: String,
        required: [true, "Please add an email"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Please add a phone number"],
        trim: true,
      },
    },
    profileSummary: {
      type: String,
      required: [true, "Please add a profile summary"],
      trim: true,
    },
    skills: {
      languages: {
        type: [String],
        required: true,
      },
      frameworks: {
        type: [String],
        required: true,
      },
      tools: {
        type: [String],
        required: true,
      },
      databases: {
        type: [String],
        required: true,
      },
      others: {
        type: [String],
        required: true,
      },
    },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    education: [
      {
        course: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: String, required: true },
      },
    ],
    achievements: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
