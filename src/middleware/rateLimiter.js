const rateLimit = require("express-rate-limit");
const { MemoryStore } = require("express-rate-limit");
 

const limiter = rateLimit({
  windowMs: 1000,
  max: 3,
  //message: "Your limit exceeded",
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


/*const dotenv = require("dotenv");
const redis = require("redis");
const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

dotenv.config();

// const redisClient = redis.createClient(
//   process.env.redis_host,
//   process.env.redis_port,
 
// );

const redisClient = redis.createClient(process.env.redisendpointUri, { password:process.env.redispassword });


redisClient.on("error", function (err) {
  console.log(redis_host + ":"  + err);
});
redisClient.on("connect", function () {
  console.log("Redis server connected -- " + redis_host + "" );
});

const limiter =  RateLimit({
  store: new RedisStore({
    client: redisClient,
    expiry: 10,
  }),
  max: 10,
  windowMs: 10 * 1000,
});

module.exports = limiter;

*/