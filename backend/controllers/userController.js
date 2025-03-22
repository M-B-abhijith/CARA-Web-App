const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");

// Register Controller
const registerController = async (req, res) => {


  console.log("inside register controller");
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username) {
      return res.status(400).send({
        success: false,
        message: "Username is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Username is already registered",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save user
    await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// Login Controller
// const loginController = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Validation
//     if (!username || !password) {
//       return res.status(400).send({
//         success: false,
//         message: "Username and password are required",
//       });
//     }

//     // Find user
//     const user = await userModel.findOne({ username });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Match password
//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid username or password",
//       });
//     }

//     // Generate JWT token
//     const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     return res.status(200).send({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in login API",
//       error,
//     });
//   }
// };



//updated login controller with admin checking just for the feature in simple way


const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Match password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check if user is admin
    const isAdmin = username === "admin" && password === "admin123";

    // Generate JWT token
    const token = JWT.sign(
      { _id: user._id, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
      isAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};


module.exports = {
  registerController,
  loginController,
};
