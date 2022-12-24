const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const asyncHandler = require("./asyncHandler");

const logEvents = asyncHandler(async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
  }

  await fsPromises.appendFile(
    path.join(__dirname, "..", "logs", logName),
    logItem
  );
});

const logger = (req, res, next) => {
  const public = req.url.split("/")[1];

  if (public !== "public") {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
  }

  next();
};

module.exports = { logger, logEvents };
