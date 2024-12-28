const express = require("express");
const mongoose = require("mongoose");
const routeController = require("./controllers/routeController"); //handles routes
const logs = require("./routes/logs"); // API request logging
const app = express();
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://gaurisankar2003:F3nEuvJKmXs8mmNb@cluster0.0whco.mongodb.net/products_db"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error: MongoDB not connected!", err));

  
  //Logging middleware
  app.use((req, res, next) => {
    const logMessage = `${new Date().toISOString()} | ${req.method} ${
      req.url
    } | Body: ${JSON.stringify(req.body)} | Query: ${JSON.stringify(
      req.query
    )}\n`;
    
    const logFilePath = path.join(__dirname, "logs.txt");
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
    next();
  });
  
  app.use("/api/products", routeController);
  
  app.get("/", (req, res) => {
    try {
      res.set("Content-Type", "text/html");
    res.send("QwikBuyz API");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/logs", logs);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
