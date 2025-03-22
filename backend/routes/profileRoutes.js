const express = require("express");
const {
    createOrUpdateProfileController,
    fetchProfileController,
  
} = require("../controllers/profileController");

const authenticate = require("../authMiddleware/authMiddleware");

//riouter object
const router = express.Router();

//routes
// Use the authentication middleware here
router.post("/profilecreate", authenticate, createOrUpdateProfileController);
router.get("/getprofile", authenticate, fetchProfileController);


// // LOGIN || POST
// router.post("/login", loginController);


//export
module.exports = router;