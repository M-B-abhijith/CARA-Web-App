const Job = require("../models/jobpostmodel");

// Create or Update Job Controller
const createOrUpdateJobController = async (req, res) => {
    console.log("inside createOrUpdateJobController");
  
    try {
      const { company, title, location, salary } = req.body;
  
      console.log(company, title, location, salary);
  
      // Validation: Ensure all required fields exist
      if (!company?.name || !company?.logo || !title || !location || !salary) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check if the job already exists
      const existingJob = await Job.findOne({ title, "company.name": company.name });
  
      let job;
  
      if (existingJob) {
        // If job exists, update it
        job = await Job.findByIdAndUpdate(
          existingJob._id,
          { company, title, location, salary },
          { new: true }
        );
      } else {
        // If job does not exist, create a new one
        job = new Job({ company, title, location, salary });
        await job.save();
      }
  
      return res.status(201).send({
        success: true,
        message: "Job created/updated successfully",
        job,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error in creating/updating job",
        error,
      });
    }
  };
  

// Fetch Job Controller
const fetchJobController = async (req, res) => {
  console.log("inside fetchJobController");

  try {
    const { title, companyName } = req.params;
    const job = await Job.findOne({ title, "company.name": companyName });

    console.log(job);

    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).send({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching job",
      error,
    });
  }
};


const fetchAllJobsController = async (req, res) => {
    console.log("inside fetchAllJobsController");
  
    try {
      const { title, companyName } = req.query; // Optional filters
      let query = {};
  
      if (title) query.title = title;
      if (companyName) query["company.name"] = companyName;
  
      const jobs = await Job.find(query);
  
      if (!jobs.length) {
        return res.status(404).send({
          success: false,
          message: "No jobs found",
        });
      }
  
      return res.status(200).send({
        success: true,
        jobs,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return res.status(500).send({
        success: false,
        message: "Error in fetching jobs",
        error,
      });
    }
  };
  

module.exports = {
  createOrUpdateJobController,
  fetchJobController,
  fetchAllJobsController
};