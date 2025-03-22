// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express();

// // Middleware configuration
// const corsOptions = {
//   origin: process.env.REACT_APP_WEB_ORIGIN, // Replace with your web app's origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow additional methods if needed
//   credentials: true, // Allow cookies and credentials
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(morgan("dev"));

// // Routes
// app.use("/api/v1/auth", require("./routes/userRoutes"));
// app.use("/api/v1/profilesetup",require("./routes/profileRoutes"));
// app.use("/api/v1/careers",require("./routes/careerRoutes"));
// app.use("/api/v1/jobpost",require("./routes/jobpostRoutes"));





// // Serve static files (for production)
// if (process.env.NODE_ENV === "production") {
//   const path = require("path");
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
  
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
//   });
// }

// // Set up the server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`.bgGreen.white);
// });




// new ml api adjusting cors code below

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Enhanced security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.REACT_APP_WEB_ORIGIN || "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-csrf-token',
    'x-requested-with'
  ],
  credentials: true,
  optionsSuccessStatus: 204
};

// CORS preflight handling
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(cors(corsOptions));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Morgan logging
app.use(morgan("dev"));

// Route health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date()
  });
});

// API Routes
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/profilesetup", require("./routes/profileRoutes"));
app.use("/api/v1/careers", require("./routes/careerRoutes"));
app.use("/api/v1/jobpost", require("./routes/jobpostRoutes"));

app.use("/api/v1/jobscrape", require("./routes/jobScraped"));



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Production static files
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

// Server initialization
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.stack}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception Error: ${err.stack}`);
  server.close(() => process.exit(1));
});