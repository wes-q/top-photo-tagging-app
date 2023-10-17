const winston = require("winston");

// Create a Winston logger instance
const winstonLogger = winston.createLogger({
    level: "info", // Set the logging level
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(), // Log to the console
        // You can add more transports here, like logging to a file
    ],
});

module.exports = winstonLogger;
