const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  })
);
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});
app.set('trust proxy', 1); // Trust the first proxy


// MongoDB connection
const con = require("./db/connection");

// Routes
app.use("/api/auth", require("./routes/AuthRouter"));
app.use(require("./routes/route"));

// Start server after DB connection
con
  .then((db) => {
    if (!db) {
      console.log("DB connection failed");
      return process.exit(1);
    }

    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) => {
      console.log(`Failed To Connect with HTTP Server : ${err}`);
    });
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });
