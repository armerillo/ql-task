const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
//const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const router = require("./controller/age.controller");
dotenv.config();


const app = express();


app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());


// const limiter = rateLimit({
//   windowMs:1 * 60 * 1000,
//   max: 2,
//   //message: "Your limit exceeded",
//   standardHeaders: true,
//   legacyHeaders: false,
//   handler: function (req, res) {
//     return res.status(429).json({
//       error: "You sent too many requests. Please try again later",
//     });
//   },
// });

// app.use(limiter);

// Parse incoming requests data
app.use((req, res, next) => {
  express.json({ limit: "300kb" })(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null,
      });
    }
    next();
  });
});

app.use(express.urlencoded({ extended: true }));

// base api
app.use("/", router);

// CATCH ALL INVALID ROUTES
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route",
  });
  next();
});



process.on("uncaughtException", () => {
  process.exit(0);
});

process.on("uncaughtExceptionMonitor", () => {
  process.exit(0);
});
process.on("unhandledRejection", () => {
  process.exit(0);
});



module.exports =  app;
