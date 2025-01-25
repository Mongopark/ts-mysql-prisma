import * as winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const getLogLevel = () => {
  const env = process.env.NODE_ENV || "development";
  return env === "development" ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "white",
  debug: "blue",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.simple(),
  winston.format.printf(
    (info) => `${info.timestamp}-- ${info.level}:  ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
];

export const logger = winston.createLogger({
  level: getLogLevel(),
  levels,
  format,
  transports,
  rejectionHandlers: process.env.NODE_ENV !== "development" && [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});
