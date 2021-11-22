const express = require("express");
const router = require("./routes/index");
const port = 3000;
const app = express();

// Use router settings in routes folder
app.use("/", router);

// Error handling when there is no route end point users hit
app.get("*", (req, res) => {
  res
    .status(404)
    .send({ message: "This URL path is not available as an api endpoint" });
});

// Start server listening at 3000
const server = app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

// Export server for testing
module.exports = server;
