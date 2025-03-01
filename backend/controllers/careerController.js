const Career = require("../models/careerModel");

// Create or Update Career Controller
// const createOrUpdateCareerController = async (req, res) => {
//     console.log("inside createOrUpdateCareerController");
  
//     try {
//       const { title, jobOverview, salary, responsibilities, techStack, education, certifications, careerGrowth, pros, cons, futureTrends } = req.body;

//       console.log(title, jobOverview, salary, responsibilities, techStack, education, certifications, careerGrowth, pros, cons, futureTrends);
  
//       // Validation
//       if (!title || !jobOverview || !salary || !responsibilities || !techStack || !education || !certifications || !careerGrowth || !pros || !cons || !futureTrends) {
//         return res.status(400).send({
//           success: false,
//           message: "All fields are required",
//         });
//       }
  
//       // Check if the career already exists
//       const existingCareer = await Career.findOne({ title });
      
//       let career;
  
//       if (existingCareer) {
//         // If career exists, update it
//         career = await Career.findByIdAndUpdate(
//           existingCareer._id,
//           { title, jobOverview, salary, responsibilities, techStack, education, certifications, careerGrowth, pros, cons, futureTrends },
//           { new: true }
//         );
//       } else {
//         // If career does not exist, create a new one
//         career = new Career({ title, jobOverview, salary, responsibilities, techStack, education, certifications, careerGrowth, pros, cons, futureTrends });
//         await career.save();
//       }
  
//       return res.status(201).send({
//         success: true,
//         message: "Career created/updated successfully",
//         career,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({
//         success: false,
//         message: "Error in creating/updating career",
//         error,
//       });
//     }
// };


const createOrUpdateCareerController = async (req, res) => {
  console.log("inside createOrUpdateCareerController");

  try {
    const {
      title,
      jobOverview,
      salary,
      responsibilities,
      techStack,
      education,
      careerGrowth,
      prosAndCons,
      futureTrends,
    } = req.body;

    console.log(
      title,
      jobOverview,
      salary,
      responsibilities,
      techStack,
      education,
      careerGrowth,
      prosAndCons,
      futureTrends
    );

    // Validation: Ensure all required fields exist
    if (
      !title ||
      !jobOverview ||
      !salary?.entryLevel ||
      !salary?.midLevel ||
      !salary?.seniorLevel ||
      !responsibilities?.length ||
      !techStack?.languages?.length ||
      !techStack?.frameworks?.length ||
      !techStack?.tools?.length ||
      !techStack?.databases?.length ||
      !techStack?.others?.length ||
      !education?.degree ||
      !education?.certifications?.length ||
      !careerGrowth?.length ||
      !prosAndCons?.pros?.length ||
      !prosAndCons?.cons?.length ||
      !futureTrends?.length
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the career already exists
    const existingCareer = await Career.findOne({ title });

    let career;

    if (existingCareer) {
      // If career exists, update it
      career = await Career.findByIdAndUpdate(
        existingCareer._id,
        {
          title,
          jobOverview,
          salary,
          responsibilities,
          techStack,
          education,
          careerGrowth,
          prosAndCons,
          futureTrends,
        },
        { new: true }
      );
    } else {
      // If career does not exist, create a new one
      career = new Career({
        title,
        jobOverview,
        salary,
        responsibilities,
        techStack,
        education,
        careerGrowth,
        prosAndCons,
        futureTrends,
      });
      await career.save();
    }

    return res.status(201).send({
      success: true,
      message: "Career created/updated successfully",
      career,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating/updating career",
      error,
    });
  }
};
  
// Fetch Career Controller
const fetchCareerController = async (req, res) => {
  console.log("inside fetchCareerController");

  try {
      const titleParam = decodeURIComponent(req.params.title); // Decode title from URL
      console.log("Searching for:", titleParam);

      const career = await Career.findOne({ title: { $regex: `^${titleParam}$`, $options: "i" } }); 

      if (!career) {
          return res.status(404).send({
              success: false,
              message: "Career not found",
          });
      }

      return res.status(200).send({
          success: true,
          career,
      });
  } catch (error) {
      console.error("Error fetching career:", error);
      return res.status(500).send({
          success: false,
          message: "Error in fetching career",
          error,
      });
  }
};


module.exports = {
  createOrUpdateCareerController,
  fetchCareerController,
};
