const JWT = require("jsonwebtoken");

const authenticate = (req, res, next) => {

  console.log("inside authenticate - auth Middleware")
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  console.log("Token received:", token);


  if (!token) {
    return res.status(403).send({
      success: false,
      message: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request
    console.log("Decoded user:", req.user);  // Log the entire user object to verify the structure
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Token is not valid",
    });
  }
};

module.exports = authenticate;
