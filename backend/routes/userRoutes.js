const express = require("express");
const {
  registerController,
  registerSubmitController,
  loginController,

} = require("../controllers/userController");

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);


// LOGIN || POST
router.post("/login", loginController);


//export
module.exports = router;