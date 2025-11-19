const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Random failure middleware
app.use((req, res, next) => {
  const fail = Math.random() < 0.3; // 30% chance of failure
  if (fail) {
    // Simulate crash
    const errorMsg = `Random failure at ${new Date().toISOString()}`;
    console.error(errorMsg);
    fs.appendFileSync("error.log", errorMsg + "\n");
    res.status(500).send("Internal Server Error");
  } else {
    next();
  }
});

// Normal route
app.get("/", (req, res) => {
  res.send("Hello! App running normally.");
});

app.listen(PORT, () => {
  console.log(`Buggy app running on port ${PORT}`);
});
