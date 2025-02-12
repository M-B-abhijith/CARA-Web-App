const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware configuration
const corsOptions = {
  origin: process.env.REACT_APP_WEB_ORIGIN, // Replace with your web app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow additional methods if needed
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/profilesetup",require("./routes/profileRoutes"));
app.use("/api/v1/careers",require("./routes/careerRoutes"));
app.use("/api/v1/jobpost",require("./routes/jobpostRoutes"));





// Serve static files (for production)
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

// Set up the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.white);
});
