import fs from "fs";
import path from "path";
import pino from "pino";
// Use CommonJS require for rotating-file-stream
const rfs = await import("rotating-file-stream").then((mod) => mod.default || mod);

// Define log directory
const logDir = path.join(process.cwd(), "logs");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Setup rotating file stream
const logStream = rfs.createStream("app.log", {
  interval: "1d", // Rotate logs daily
  path: logDir,
  maxFiles: 7, // Keep the last 7 log files
  compress: "gzip", // Compress rotated logs
});

// Create Pino logger with streams
const logger = pino(
  {
    level: "info",
    transport: {
      target: "pino-pretty", // Makes logs more readable
      options: { colorize: true },
    },
  },
  pino.destination(logStream) // Write logs to rotating file
);

export default logger;
