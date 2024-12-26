const fs = require("fs");
const path = require("path");
// Logs the request details to a file

var __dirname = path.resolve(path.dirname(''));
const log = (req, res) => {
  const logFilePath = path.join(__dirname, "logs.txt");
  res.download(logFilePath, "logs.txt", (err) => {
    if (err) {
      console.error("Error downloading log file:", err);
      res.status(500).send("Error downloading log file");
    }
  });
};

module.exports = log;   