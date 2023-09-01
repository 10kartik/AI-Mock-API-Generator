const express = require("express");
const app = express();
const port = 3000;
const simulateResponse = require("./simulateResponse");

// Middleware to log request body
app.use(express.json()); // Parse JSON requests

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let requestedUrl;

app.use((req, res, next) => {
  req.extractedParams = Object.assign({}, req.params, req.query, req.body); // Extract all parameters
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("Full URL:", fullUrl);
  console.log("Full URL:", req.originalUrl);

  next();
});

app.get("/*", async function (req, res) {
  const resp = await simulateResponse(req.originalUrl, "GET");
  res.status(200).send(resp);
});

app.post("/*", async function (req, res) {
  const resp = await simulateResponse(req.originalUrl, "POST");
  res.status(200).send(resp);
});
