const express = require("express");
const {
    createOrUpdateCareerController,
    fetchCareerController,
} = require("../controllers/careerController");

const authenticate = require("../authMiddleware/authMiddleware");

// Router object
const router = express.Router();

// Routes
// Use the authentication middleware where necessary
router.post("/careercreate", authenticate, createOrUpdateCareerController);
router.get("/fetchingcareer/:title", fetchCareerController);

// Export
module.exports = router;