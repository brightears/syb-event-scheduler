import dotenv from "dotenv";
import { getLogger } from "./logger/index.js";

const logger = getLogger("lib/env");
logger.info("Starting in NODE_ENV=" + process.env.NODE_ENV);

// The dev server parses keys in non-production
if (process.env.NODE_ENV === "production") {
  const config = dotenv.config();
  logger.info(
    "Parsed .env file with keys: " + Object.keys(config.parsed ?? {}).join(","),
  );
}

// Validate required environment variables
const requiredEnvVars = [
  "SOUNDTRACK_API_URL",
  "SOUNDTRACK_API_TOKEN"
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  logger.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
  logger.error(
    "Please check your .env file or environment configuration"
  );
  process.exit(1);
}

// Validate optional environment variables with defaults
if (process.env.WORKER_INTERVAL && isNaN(parseInt(process.env.WORKER_INTERVAL))) {
  logger.warn("WORKER_INTERVAL must be a number, using default value of 60");
  process.env.WORKER_INTERVAL = "60";
}

// Log configuration (without sensitive data)
logger.info("Environment configuration validated successfully");
logger.info(`API URL: ${process.env.SOUNDTRACK_API_URL}`);
logger.info(`Worker interval: ${process.env.WORKER_INTERVAL || "60"} seconds`);
