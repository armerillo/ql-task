const express =require( "express");
const dotenv =require("dotenv") ;
const cors =require( "cors");
const helmet =require("helmet") ;
const xss =require("xss-clean") ;
const rateLimit = require("express-rate-limit") ;
const hpp = require("hpp");
const errorMiddleware = require("./middleware/error.middleware");
const router = require ("./controller/age.controller");
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

// Rate limiting
let limiter;
if (process.env.NODE_ENV === "development") {
  limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
} else {
  limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 10, // Limit each IP to 10 requests per `window` (here, per 10 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
}

app.use(limiter);

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

// Middleware to handle errors
app.use(errorMiddleware);

process.on("uncaughtException", (err) => {
  process.exit(0);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  process.exit(0);
});
process.on("unhandledRejection", (err) => {
  process.exit(0);
});



module.exports =  app;
