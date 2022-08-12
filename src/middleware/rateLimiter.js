const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1000,
    max: 3,
    message: "Your limit exceeded",
    standardHeaders: true,
    legacyHeaders: false,
});


module.exports = limiter;
