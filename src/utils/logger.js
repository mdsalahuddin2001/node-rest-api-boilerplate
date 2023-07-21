const { transports, format, createLogger } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: "src/logs/info.log",
      level: "info",
      maxsize: 5242880, //5MB
      maxFiles: 5,
    }),
    new transports.File({
      filename: "src/logs/error.log",
      level: "error",
      maxsize: 5242880, //5MB
      maxFiles: 5,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

module.exports = logger;
