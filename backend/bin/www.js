#!/usr/bin/env node

/**
 * Module dependencies.
 */

import DEBUG from "debug";
import http from "http";
import app, { appSession } from "../src/app.js";
import { Server } from "socket.io";
import setSocketIO from "../src/io.js";
import sharedSession from "express-socket.io-session";

const debug = DEBUG("backend:server");
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/* socket.io setting */
const io = new Server(server, {
  cors: { origin: "*" },
});

setSocketIO(io);
io.use(sharedSession(appSession, { autoSave: true }));
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.log("Server Start with " + port);
});
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
