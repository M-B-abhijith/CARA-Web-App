const express = require("express");
const {
    createOrUpdateJobController,
    fetchJobController,
    fetchAllJobsController
} = require("../controllers/jobpostController");

const authenticate = require("../authMiddleware/authMiddleware");

// Router object
const router = express.Router();

// Routes
// Use the authentication middleware where necessary
router.post("/jobpostcreate", authenticate, createOrUpdateJobController);
router.get("/fetchingjob", fetchJobController);
router.get("/fetchingalljobs", fetchAllJobsController);



// Export
module.exports = router;