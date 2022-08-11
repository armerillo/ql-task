const cluster = require ("cluster");
const  { cpus } = require ("os");
const app = require ("./app");



const numCPUs = cpus().length;

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

if (cluster.isPrimary) {

  //Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  const port = normalizePort(process.env.PORT || 9000);
  // Listen to port
  app.listen(port, () => {
    console.log(`Server started on Port ${port} in ${process.env.NODE_ENV} mode.`);
  });

  console.log(`Worker ${process.pid} started`);

  process.on("SIGTERM", () => {
    app.close(() => {
      console.log("Process terminated");
    });
  });
}


