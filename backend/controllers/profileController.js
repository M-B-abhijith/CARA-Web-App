// const Profile = require("../models/profileModel");

// // Create or Update Profile Controller
// const createOrUpdateProfileController = async (req, res) => {
//     console.log("inside createOrUpdateProfileController");
  
//     try {
//       const { name, role, contact, profileSummary, skills, projects, education, achievementsAndCertifications } = req.body;
  
//       // Validation
//       if (!name || !role || !contact || !profileSummary || !skills || !projects || !education || !achievementsAndCertifications) {
//         return res.status(400).send({
//           success: false,
//           message: "All fields are required",
//         });
//       }
  
//       // Ensure userId is passed from the JWT token (from the authenticated user)
//       const userId = req.user._id; // Assuming user is authenticated and req.user._id contains the user's ID
  
//       // Check if the profile exists for the user (you could relate this to user ID if you have that)
//       const existingProfile = await Profile.findOne({ userId }); // Find profile by userId
      
//       let profile;
  
//       if (existingProfile) {
//         // If profile exists, update it
//         profile = await Profile.findByIdAndUpdate(
//           existingProfile._id,
//           {
//             name,
//             role,
//             contact,
//             profileSummary,
//             skills,
//             projects,
//             education,
//             achievementsAndCertifications,
//           },
//           { new: true } // Returns the updated profile
//         );
//       } else {
//         // If profile does not exist, create a new one
//         profile = new Profile({
//           userId, // Add the userId to the profile
//           name,
//           role,
//           contact,
//           profileSummary,
//           skills,
//           projects,
//           education,
//           achievementsAndCertifications,
//         });
  
//         await profile.save();
//       }
  
//       return res.status(201).send({
//         success: true,
//         message: "Profile created/updated successfully",
//         profile,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({
//         success: false,
//         message: "Error in creating/updating profile",
//         error,
//       });
//     }
//   };
  
// // Fetch Profile Controller
// const fetchProfileController = async (req, res) => {
//     console.log("inside fetchProfileController");
  
//     try {
//         console.log("Decoded user from token:", req.user); // Log the decoded user for debugging
        
//         const profile = await Profile.findOne({ userId: req.user._id });

//         console.log("Profile found:", profile);

//         if (!profile) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Profile not found",
//             });
//         }

//         return res.status(200).send({
//             success: true,
//             profile,
//         });
//     } catch (error) {
//         console.error("Error fetching profile:", error);
//         return res.status(500).send({
//             success: false,
//             message: "Error in fetching profile",
//             error,
//         });
//     }
// };


// module.exports = {
//   createOrUpdateProfileController,
//   fetchProfileController,
// };


const Profile = require("../models/profileModel");

// Create or Update Profile Controller
const createOrUpdateProfileController = async (req, res) => {
  console.log("inside createOrUpdateProfileController");

  try {
    const { name, role, contact, profileSummary, skills, projects, education, achievements } = req.body;

    // Validation
    if (!name || !role || !contact || !profileSummary || !skills || !projects || !education || !achievements) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user._id;

    // Check if the profile exists for the user
    const existingProfile = await Profile.findOne({ userId });

    let profile;

    if (existingProfile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        existingProfile._id,
        { name, role, contact, profileSummary, skills, projects, education, achievements },
        { new: true }
      );
    } else {
      // Create new profile
      profile = new Profile({ userId, name, role, contact, profileSummary, skills, projects, education, achievements });
      await profile.save();
    }

    return res.status(201).send({
      success: true,
      message: "Profile created/updated successfully",
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating/updating profile",
      error,
    });
  }
};

// Fetch Profile Controller
const fetchProfileController = async (req, res) => {
  console.log("inside fetchProfileController");

  try {
    console.log("Decoded user from token:", req.user);

    const profile = await Profile.findOne({ userId: req.user._id });

    console.log("Profile found:", profile);

    if (!profile) {
      return res.status(404).send({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).send({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching profile",
      error,
    });
  }
};

module.exports = {
  createOrUpdateProfileController,
  fetchProfileController,
};
