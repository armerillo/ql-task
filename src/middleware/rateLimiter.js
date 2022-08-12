const rateLimit = require("express-rate-limit");


// Rate limiting
let limiter;
if (process.env.NODE_ENV === "development") {
  limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Your limit exceeded",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
} else {
  limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Your limit exceeded",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
}

module.exports = limiter;
