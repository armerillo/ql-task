const rateLimit = require("express-rate-limit");
const { MemoryStore } = require("express-rate-limit");
 
const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res) {
    return res.status(429).json({
      error: "You sent too many requests. Please try again later",
    });
    },
store: new MemoryStore(),
});

module.exports = limiter;
